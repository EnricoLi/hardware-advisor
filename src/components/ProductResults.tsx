import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ExternalLink,
  Filter,
  SortDesc,
  Monitor,
  Cpu,
  HardDrive,
  Zap,
  TrendingUp
} from "lucide-react";

interface ProductResultsProps {
  searchQuery: string;
}

// Mock data - in real app would come from API
const mockProducts = [
  {
    id: 1,
    name: "Acer Aspire 5 A515-57-74AA",
    price: 3299,
    originalPrice: 3799,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
    store: "Amazon",
    specs: {
      cpu: "Intel Core i7-1255U",
      gpu: "Intel Iris Xe Graphics", 
      ram: "8GB DDR4",
      storage: "512GB SSD",
      screen: "15.6\" Full HD",
      battery: "8h"
    },
    analysis: {
      score: 87,
      strengths: ["Excelente para escritório", "Bateria duradoura", "SSD rápido"],
      weaknesses: ["GPU integrada limitada", "RAM pode ser insuficiente para tarefas pesadas"],
      warnings: ["Jogos pesados em configurações baixas"],
      compatibility: {
        office: 95,
        gaming_light: 70,
        gaming_heavy: 35,
        video_editing: 60,
        programming: 85
      }
    }
  },
  {
    id: 2,
    name: "Dell Inspiron 15 3000 Gaming",
    price: 4199,
    originalPrice: 4599,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=200&fit=crop",
    store: "Mercado Livre",
    specs: {
      cpu: "AMD Ryzen 7 5700U",
      gpu: "NVIDIA GTX 1650 4GB",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      screen: "15.6\" Full HD 120Hz",
      battery: "6h"
    },
    analysis: {
      score: 92,
      strengths: ["Ótima GPU dedicada", "16GB RAM", "Tela 120Hz"],
      weaknesses: ["Bateria média", "Pode esquentar sob carga"],
      warnings: [],
      compatibility: {
        office: 90,
        gaming_light: 95,
        gaming_heavy: 85,
        video_editing: 88,
        programming: 92
      }
    }
  },
  {
    id: 3,
    name: "Lenovo IdeaPad Gaming 3",
    price: 3799,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=200&fit=crop",
    store: "Kabum",
    specs: {
      cpu: "AMD Ryzen 5 5600H",
      gpu: "NVIDIA GTX 1650 4GB",
      ram: "8GB DDR4",
      storage: "256GB SSD + 1TB HDD",
      screen: "15.6\" Full HD",
      battery: "5h"
    },
    analysis: {
      score: 83,
      strengths: ["Bom custo-benefício", "GPU dedicada", "Armazenamento híbrido"],
      weaknesses: ["Apenas 8GB RAM", "Bateria fraca"],
      warnings: ["Recomendado upgrade de RAM"],
      compatibility: {
        office: 85,
        gaming_light: 90,
        gaming_heavy: 75,
        video_editing: 70,
        programming: 80
      }
    }
  }
];

export const ProductResults = ({ searchQuery }: ProductResultsProps) => {
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'match'>('score');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'success';
    if (score >= 70) return 'warning';
    return 'danger';
  };

  const getCompatibilityIcon = (score: number) => {
    if (score >= 85) return <CheckCircle className="h-4 w-4 text-success" />;
    if (score >= 70) return <AlertTriangle className="h-4 w-4 text-warning" />;
    return <XCircle className="h-4 w-4 text-danger" />;
  };

  const usageLabels = {
    office: 'Escritório',
    gaming_light: 'Jogos Leves', 
    gaming_heavy: 'Jogos Pesados',
    video_editing: 'Edição Vídeo',
    programming: 'Programação'
  };

  if (selectedProduct) {
    const product = mockProducts.find(p => p.id === selectedProduct);
    if (!product) return null;

    return (
      <div className="min-h-screen bg-gradient-hero py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setSelectedProduct(null)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos resultados
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Info */}
            <Card className="bg-gradient-card border-border/50 shadow-glow">
              <CardHeader>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-success">
                    R$ {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      R$ {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <Badge variant="secondary" className="w-fit">
                  {product.store}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processador:</span>
                    <span className="font-medium">{product.specs.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Placa de Vídeo:</span>
                    <span className="font-medium">{product.specs.gpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memória RAM:</span>
                    <span className="font-medium">{product.specs.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Armazenamento:</span>
                    <span className="font-medium">{product.specs.storage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tela:</span>
                    <span className="font-medium">{product.specs.screen}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bateria:</span>
                    <span className="font-medium">{product.specs.battery}</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
                  Ver na {product.store}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Analysis */}
            <div className="space-y-6">
              {/* Score */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-warning" />
                    Score de Compatibilidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className={`text-4xl font-bold text-${getScoreColor(product.analysis.score)}`}>
                      {product.analysis.score}%
                    </div>
                    <Progress 
                      value={product.analysis.score} 
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Compatibility */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Compatibilidade por Uso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(product.analysis.compatibility).map(([usage, score]) => (
                    <div key={usage} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCompatibilityIcon(score)}
                        <span>{usageLabels[usage as keyof typeof usageLabels]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{score}%</span>
                        <Progress value={score} className="w-20" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Strengths & Weaknesses */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Análise Detalhada</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-success mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Pontos Fortes
                    </h4>
                    <ul className="space-y-1">
                      {product.analysis.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-success rounded-full" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {product.analysis.weaknesses.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-warning mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Pontos de Atenção
                      </h4>
                      <ul className="space-y-1">
                        {product.analysis.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-warning rounded-full" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.analysis.warnings.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-danger mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        Limitações
                      </h4>
                      <ul className="space-y-1">
                        {product.analysis.warnings.map((warning, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-danger rounded-full" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Resultados para: <span className="text-tech-primary">"{searchQuery}"</span>
          </h1>
          <p className="text-muted-foreground">
            {mockProducts.length} produtos encontrados com análise inteligente
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <SortDesc className="mr-2 h-4 w-4" />
            Ordenar por Score
          </Button>
          <Badge variant="secondary" className="bg-tech-primary/10 text-tech-primary">
            Baseado na sua intenção de compra
          </Badge>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <Card 
              key={product.id} 
              className="cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50"
              onClick={() => setSelectedProduct(product.id)}
            >
              <CardHeader className="p-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.store}
                  </Badge>
                  <div className={`flex items-center gap-1 text-${getScoreColor(product.analysis.score)}`}>
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">{product.analysis.score}%</span>
                  </div>
                </div>

                <h3 className="font-semibold mb-3 line-clamp-2">{product.name}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Cpu className="h-3 w-3" />
                    <span>{product.specs.cpu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-3 w-3" />
                    <span>{product.specs.gpu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <HardDrive className="h-3 w-3" />
                    <span>{product.specs.ram} • {product.specs.storage}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-success">
                      R$ {product.price.toLocaleString()}
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="text-sm text-muted-foreground line-through">
                        R$ {product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                    Ver Análise
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <TrendingUp className="mr-2 h-4 w-4" />
            Carregar Mais Produtos
          </Button>
        </div>
      </div>
    </div>
  );
};