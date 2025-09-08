import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, CheckCircle, Laptop, Monitor, HardDrive, Gamepad2, Briefcase, Video, Code } from "lucide-react";

interface IntentionFormProps {
  onComplete: () => void;
}

interface FormData {
  category: string;
  budget: string;
  usage: string[];
  specs: string;
}

export const IntentionForm = ({ onComplete }: IntentionFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    budget: '',
    usage: [],
    specs: ''
  });

  const categories = [
    { id: 'notebook', name: 'Notebook', icon: Laptop },
    { id: 'desktop', name: 'Desktop/PC', icon: Monitor },
    { id: 'components', name: 'Componentes', icon: HardDrive }
  ];

  const budgetRanges = [
    { id: '0-1500', label: 'Até R$ 1.500', popular: false },
    { id: '1500-3000', label: 'R$ 1.500 - R$ 3.000', popular: true },
    { id: '3000-5000', label: 'R$ 3.000 - R$ 5.000', popular: true },
    { id: '5000-8000', label: 'R$ 5.000 - R$ 8.000', popular: false },
    { id: '8000+', label: 'Acima de R$ 8.000', popular: false }
  ];

  const usageTypes = [
    { id: 'office', name: 'Escritório/Estudos', icon: Briefcase },
    { id: 'gaming-light', name: 'Jogos Leves', icon: Gamepad2 },
    { id: 'gaming-heavy', name: 'Jogos Pesados', icon: Gamepad2 },
    { id: 'video-editing', name: 'Edição de Vídeo', icon: Video },
    { id: 'programming', name: 'Programação/IA', icon: Code }
  ];

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
    setStep(2);
  };

  const handleBudgetSelect = (budget: string) => {
    setFormData({ ...formData, budget });
    setStep(3);
  };

  const handleUsageToggle = (usage: string) => {
    const newUsage = formData.usage.includes(usage)
      ? formData.usage.filter(u => u !== usage)
      : [...formData.usage, usage];
    setFormData({ ...formData, usage: newUsage });
  };

  const handleComplete = () => {
    // Save intention data (would be sent to backend)
    localStorage.setItem('userIntention', JSON.stringify(formData));
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3">Que tipo de produto você busca?</h2>
              <p className="text-muted-foreground">Selecione a categoria principal</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer hover:shadow-glow transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <category.icon className="h-12 w-12 mx-auto mb-4 text-tech-primary" />
                    <h3 className="font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3">Qual sua faixa de orçamento?</h2>
              <p className="text-muted-foreground">Isso nos ajuda a filtrar as melhores opções</p>
            </div>
            
            <div className="space-y-3">
              {budgetRanges.map((range) => (
                <Card
                  key={range.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-glow bg-gradient-card border-border/50 ${
                    formData.budget === range.id ? 'ring-2 ring-tech-primary' : ''
                  }`}
                  onClick={() => handleBudgetSelect(range.id)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium">{range.label}</span>
                    {range.popular && (
                      <Badge variant="secondary" className="bg-tech-accent text-black">
                        Popular
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3">Para que você vai usar?</h2>
              <p className="text-muted-foreground">Selecione todas as opções que se aplicam</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {usageTypes.map((usage) => (
                <Card
                  key={usage.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-glow bg-gradient-card border-border/50 ${
                    formData.usage.includes(usage.id) ? 'ring-2 ring-tech-primary bg-tech-primary/5' : ''
                  }`}
                  onClick={() => handleUsageToggle(usage.id)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <usage.icon className="h-6 w-6 text-tech-primary" />
                    <span className="font-medium">{usage.name}</span>
                    {formData.usage.includes(usage.id) && (
                      <CheckCircle className="h-5 w-5 text-tech-primary ml-auto" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4">
              <Button 
                onClick={() => setStep(4)} 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                disabled={formData.usage.length === 0}
              >
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-3">Alguma especificação específica?</h2>
              <p className="text-muted-foreground">Ex: Intel i7, RTX 4060, 16GB RAM (opcional)</p>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="Ex: Preciso de pelo menos 16GB de RAM e SSD de 500GB"
                value={formData.specs}
                onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                className="h-12 bg-card/50 border-border/50 focus:border-tech-primary"
              />
              
              <div className="text-sm text-muted-foreground text-center">
                Deixe em branco se não tiver preferências específicas
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(3)}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button 
                onClick={handleComplete}
                className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
              >
                Encontrar Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gradient-card border-border/50 shadow-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-center flex-1">
                Busca Inteligente
              </CardTitle>
              {step > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep(step - 1)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                    stepNumber <= step 
                      ? 'bg-gradient-primary' 
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              Passo {step} de 4
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};