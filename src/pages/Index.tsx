import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Cpu, HardDrive, Monitor, Zap, TrendingUp, Star, ChevronRight, Filter } from "lucide-react";
import { IntentionForm } from "@/components/IntentionForm";
import { ProductResults } from "@/components/ProductResults";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'form' | 'results'>('home');
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('results');
    }
  };

  const handleStartIntention = () => {
    setCurrentView('form');
  };

  const handleFormComplete = () => {
    setCurrentView('results');
  };

  if (currentView === 'form') {
    return <IntentionForm onComplete={handleFormComplete} />;
  }

  if (currentView === 'results') {
    return <ProductResults searchQuery={searchQuery} />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <HeroSection 
        onSearch={handleSearchSubmit}
        onStartIntention={handleStartIntention}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <StatsSection />

      {/* Popular Categories */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Categorias Populares</h2>
          <p className="text-muted-foreground text-lg">Encontre o equipamento ideal para suas necessidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Notebooks Gamer", icon: Monitor, count: "2.3k produtos", color: "tech-primary" },
            { name: "Processadores", icon: Cpu, count: "890 produtos", color: "tech-secondary" },
            { name: "Placas de Vídeo", icon: Zap, count: "1.2k produtos", color: "tech-accent" },
            { name: "SSDs", icon: HardDrive, count: "650 produtos", color: "warning" }
          ].map((category, index) => (
            <Card key={index} className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow bg-gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-4 rounded-full bg-${category.color}/10 mb-4 group-hover:bg-${category.color}/20 transition-colors`}>
                  <category.icon className={`h-8 w-8 text-${category.color}`} />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground text-lg">Encontre o produto perfeito em 3 passos simples</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Defina suas Necessidades",
                description: "Responda 4 perguntas simples sobre o que você precisa",
                icon: Filter
              },
              {
                step: "02", 
                title: "Análise Inteligente",
                description: "Nosso algoritmo analisa milhares de produtos em tempo real",
                icon: TrendingUp
              },
              {
                step: "03",
                title: "Recomendações Personalizadas",
                description: "Receba produtos com análise detalhada e score de compatibilidade",
                icon: Star
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 mx-auto shadow-glow">
                    <item.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <Badge variant="secondary" className="absolute -top-2 -right-2 bg-tech-accent text-black font-bold">
                    {item.step}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-card border-border/50 shadow-glow">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Pronto para Encontrar seu Setup Ideal?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Junte-se a milhares de usuários que já encontraram o produto perfeito
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
                  onClick={handleStartIntention}
                >
                  Começar Busca Inteligente
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Ver Exemplos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;