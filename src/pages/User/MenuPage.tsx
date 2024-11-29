import React, { useState, useMemo,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import MenuItem from '../../components/MenuItem';
import NotFound from '../../components/NotFound';
import FixedCartBar from '../../components/FixedCartBar';


interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface MenuCategory {
  _id: string;
  name: string;
}

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        console.log(`${import.meta.env.VITE_BACKEND_URL}/menu`);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/menu`);
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();
        setMenuItems(data.items);
      } catch (err) {
        setError('Error fetching menu data. Please try again later.');
        console.error('Error fetching menu data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setMenuCategories(data);
    } catch (err) {
      setError('Error fetching menu data. Please try again later.');
      console.error('Error fetching menu data:', err);
    }
  };

  const filteredItems = useMemo(() => {
    if (!Array.isArray(menuItems)) return [];
    
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.category._id === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, searchTerm, activeCategory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setActiveCategory('all');
  };

  const handleCartClick = () => {
    navigate(`/table/${tableNumber}/order-details`);
  };

  return (
    <div className="relative pt-16 pb-24">
      <TopBar onSearch={handleSearch} isVisible={isVisible} />
      <div 
        className="sticky bg-white z-40 shadow-md"
        style={{ 
          transition: 'top 0.3s',
          top: isVisible ? '64px' : '0px'
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex overflow-x-auto md:overflow-x-hidden pb-2 hide-scrollbar">
            <button
              key="all"
              className={`flex-none md:flex-1 min-w-[120px] md:min-w-0 px-4 py-2 mx-1 rounded-full whitespace-nowrap text-center ${
                activeCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {menuCategories.map((category) => (
              <button
                key={category._id}
                className={`flex-none md:flex-1 min-w-[120px] md:min-w-0 px-4 py-2 mx-1 rounded-full whitespace-nowrap text-center ${
                  activeCategory === category._id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition-colors`}
                onClick={() => setActiveCategory(category._id)}
              >
                <span className="block truncate">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItem key={item._id} id={item._id} {...item} />
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
      <FixedCartBar onClick={handleCartClick} />
    </div>
  );
};

export default MenuPage;
