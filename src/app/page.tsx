import Image from 'next/image';
import Link from 'next/link';
import { principles } from '@/lib/covenant';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, PenSquare, Share2 } from 'lucide-react';
import Header from '@/components/app/header';

export default function Home() {
  const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    The Covenant Council
                  </h1>
                  <p className="max-w-[600px] text-foreground/90 md:text-xl mx-auto lg:mx-0">
                    Submit an artifact to a council of 10 AI agents, each embodying a principle of Human Tech. The council will analyze your submission and provide a multi-faceted deliberation on its ethical and societal implications.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button asChild size="lg">
                    <Link href="/council">
                      Enter the Council <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                   <Button asChild size="lg" variant="secondary">
                    <Link href="/covenant-explorer">
                      Explore the Covenant <Share2 className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href="https://manifest.human.tech/manifesto" target="_blank" rel="noopener noreferrer">
                      Sign the Manifesto <PenSquare className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <Image
                src={getImage('human-tech')?.imageUrl || ''}
                width={600}
                height={400}
                alt="Human Tech"
                data-ai-hint="futuristic technology human"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="principles" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">The Principles</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  To unify collective alignment efforts, we enter into a Covenant of Humanistic Technologies, grounded in principles we hold self-evident.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
              {principles.map((principle) => (
                <Card key={principle.id} className="h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <principle.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="font-headline">{principle.shortTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-semibold">{principle.title.split(': ')[1]}</p>
                    <p className="text-sm text-foreground/80">{principle.description}</p>
                    {principle.imageId && (
                      <div className="pt-4">
                         <Image
                            src={getImage(principle.imageId)?.imageUrl || ''}
                            width={400}
                            height={250}
                            alt={principle.shortTitle}
                            data-ai-hint={getImage(principle.imageId)?.imageHint || ''}
                            className="rounded-lg object-cover w-full aspect-video"
                         />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center w-full h-16 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2025 Covenant Council. All rights reserved.</p>
      </footer>
    </div>
  );
}
