import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, Target, Zap } from "lucide-react";

import heroImage from "@/assets/hero-tech.jpg";

interface HeroSectionProps {
  onSearch: (e: React.FormEvent) => void;
  onStartIntention: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const HeroSection = ({ onSearch, onStartIntention, searchQuery, setSearchQuery }: HeroSectionProps) => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Tech Hardware Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      <div className="relative max-w-7xl mx-auto">{/* ... rest of content ... */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-6 bg-tech-primary/10 text-tech-primary border-tech-primary/20">
            <Sparkles className="mr-1 h-3 w-3" />
            Análise Inteligente de Hardware
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Encontre o
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Setup Perfeito</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Algoritmo inteligente que analisa milhares de produtos para encontrar exatamente o que você precisa. 
            Sem complicação, sem erro de compra.
          </p>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={onSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Ex: Notebook gamer até R$ 4.000 para jogar CS:GO"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-card/50 border-border/50 focus:border-tech-primary transition-colors"
                />
              </div>
              <Button type="submit" size="lg" className="h-14 px-8 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
                <Search className="mr-2 h-5 w-5" />
                Buscar
              </Button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onStartIntention}
              className="border-tech-primary/30 hover:bg-tech-primary/10 hover:border-tech-primary transition-colors"
            >
              <Target className="mr-2 h-5 w-5" />
              Busca Inteligente Guiada
            </Button>
            <div className="text-sm text-muted-foreground">
              ou use nossa análise inteligente em 4 perguntas
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { label: "Produtos Analisados", value: "50k+", icon: Zap },
              { label: "Match Rate", value: "94%", icon: Target },
              { label: "Usuários Ativos", value: "12k+", icon: Sparkles }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <stat.icon className="h-5 w-5 text-tech-accent" />
                <span className="font-bold text-foreground">{stat.value}</span>
                <span className="text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};