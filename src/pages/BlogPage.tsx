import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { JewelryImage } from '../components/JewelryImage';
import { BLOG_ARTICLES } from '../data/products';
import { BlogArticle } from '../types/store';

export const BlogPage: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  if (activeArticle) {
    return (
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <button
          type="button"
          onClick={() => setActiveArticle(null)}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#6E4B57] hover:text-[#B8295B] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al blog</span>
        </button>

        <p className="text-xs font-medium text-[#6E4B57] uppercase tracking-wider">
          {activeArticle.category} · {activeArticle.date} · {activeArticle.readTime}
        </p>
        <h1 className="mt-3 font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D] leading-tight">
          {activeArticle.title}
        </h1>

        <div className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden border border-[#F3D5DF] bg-[#FFF4F7]">
          <JewelryImage src={activeArticle.image} alt={activeArticle.title} className="w-full h-full" />
        </div>

        <div className="mt-8 space-y-5 text-base text-[#2A151D] leading-relaxed">
          {activeArticle.content.map((paragraph, index) => (
            <p key={index} className="text-[#4B3F41]">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C78A47]">
          Revista Editorial Luz Gomez
        </p>
        <h1 className="mt-2 font-serif-display text-3xl sm:text-5xl font-semibold text-[#2A151D]">
          Guías y consejos de joyería
        </h1>
        <p className="mt-3 text-base text-[#6E4B57]">
          Descubre cómo elegir tallas, cuidar tus piezas de oro 18k y plata 925 e inspirarte para tus grabados personalizados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_ARTICLES.map((article) => (
          <article
            key={article.id}
            className="bg-white border border-[#F3D5DF] rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="aspect-[16/10] bg-[#FFF4F7] overflow-hidden">
                <JewelryImage src={article.image} alt={article.title} className="w-full h-full" />
              </div>
              <div className="p-6">
                <p className="text-xs text-[#6E4B57]">
                  {article.category} · {article.date} · {article.readTime}
                </p>
                <h2 className="mt-2 font-serif-display text-2xl font-semibold text-[#2A151D] leading-snug">
                  {article.title}
                </h2>
                <p className="mt-2.5 text-sm text-[#6E4B57] leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button
                type="button"
                onClick={() => setActiveArticle(article)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8295B] hover:text-[#911C45]"
              >
                <span>Leer artículo completo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
