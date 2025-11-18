// src/pages/HomePage.jsx
import { useRecipes } from '../hooks/useRecipes';
import HeroSection from '../components/home/HeroSection';
import FeaturedMakananSection from '../components/home/FeaturedMakananSection';
import FeaturedMinumanSection from '../components/home/FeaturedMinumanSection';
import { useEffect } from 'react'; // <--- TAMBAHKAN INI

export default function HomePage({ onRecipeClick, onNavigate }) {
  // --- LOGIKA BARU UNTUK MEMBACA URL PARAMETERS (SHARE LINK) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get('recipe');
    const category = params.get('category');

    if (recipeId && category) {
      // 1. Panggil prop onRecipeClick untuk memicu perpindahan ke RecipeDetailPage
      // Asumsi onRecipeClick(id, category) akan mengubah state di parent component
      onRecipeClick(recipeId, category);

      // 2. Hapus parameter dari URL agar browser URL terlihat bersih
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, '', cleanUrl);
    }
  }, [onRecipeClick]); // onRecipeClick dimasukkan ke dependency array

  // -----------------------------------------------------------

  // Fetch featured makanan (food) recipes from API
  const { 
    recipes: featuredMakanan, 
    loading: loadingMakanan,
    error: errorMakanan 
  } = useRecipes({
    category: 'makanan',
    limit: 3,
    sort_by: 'created_at',
    order: 'desc'
  });

  // Fetch featured minuman (drinks) recipes from API
  const { 
    recipes: featuredMinuman,
    loading: loadingMinuman,
    error: errorMinuman
  } = useRecipes({
    category: 'minuman',
    limit: 2,
    sort_by: 'created_at',
    order: 'desc'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Featured Makanan Section */}
        <FeaturedMakananSection
          recipes={featuredMakanan}
          loading={loadingMakanan}
          error={errorMakanan}
          onRecipeClick={onRecipeClick}
          onNavigate={onNavigate}
        />

        {/* Featured Minuman Section */}
        <FeaturedMinumanSection
          recipes={featuredMinuman}
          loading={loadingMinuman}
          error={errorMinuman}
          onRecipeClick={onRecipeClick}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}