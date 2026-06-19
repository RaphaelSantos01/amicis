import { Button } from "../compentents/ui/Button";
import { Card } from "../compentents/ui/Card";
import { Badge } from "../compentents/ui/Badge";

export default function Home() {
  return (
    <div>
      <section className="bg-[#FFF8F1] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="mb-6 text-5xl font-bold text-[#4A2511]">
            Conectando pessoas e animais através do cuidado.
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-700">
            Adote, apadrinhe, encontre serviços especializados e ajude a
            transformar a vida de milhares de animais.
          </p>
          <div className="flex justify-center gap-4">
            <Button>
              Encontrar um Animal
            </Button>

            <Button variant="outline">
              Conhecer Serviços
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-3xl font-bold text-[#4A2511]">
            Animais em Destaque
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <Badge>Disponível para adoção</Badge>

              <h3 className="mt-4 text-xl font-semibold">
                🐶 Thor
              </h3>

              <p className="mt-2 text-gray-600">
                Labrador adulto muito dócil.
              </p>
            </Card>

            <Card>
              <Badge>Disponível para adoção</Badge>

              <h3 className="mt-4 text-xl font-semibold">
                🐱 Luna
              </h3>

              <p className="mt-2 text-gray-600">
                Gata jovem e extremamente carinhosa.
              </p>
            </Card>

            <Card>
              <Badge variant="brown">
                Apadrinhamento
              </Badge>

              <h3 className="mt-4 text-xl font-semibold">
                🐶 Max
              </h3>

              <p className="mt-2 text-gray-600">
                Precisa de apoio para alimentação e medicamentos.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}