import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, ShoppingCart, Award } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: ShoppingCart,
      value: "R$ 2.1M",
      label: "Em Vendas Geradas",
      growth: "+23%"
    },
    {
      icon: Users,
      value: "12.5k",
      label: "Usuários Satisfeitos",
      growth: "+15%"
    },
    {
      icon: Award,
      value: "94%",
      label: "Taxa de Acerto",
      growth: "+5%"
    },
    {
      icon: TrendingUp,
      value: "3.2min",
      label: "Tempo Médio de Busca",
      growth: "-12%"
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-full bg-tech-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-tech-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-muted-foreground text-sm mb-2">{stat.label}</div>
                <div className="text-success text-xs font-medium">
                  {stat.growth} este mês
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};