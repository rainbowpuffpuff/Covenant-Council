'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2, Send, Wand2, Bot, FileText, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import Header from '@/components/app/header';
import { processArtifact, type FormState } from './actions';
import { OpinionVisualization } from '@/components/app/opinion-visualization';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Submit to Council
        </>
      )}
    </Button>
  );
}

const initialState: FormState = {
  opinions: null,
  error: null,
  timestamp: Date.now(),
};

export default function CouncilPage() {
  const [state, formAction] = useActionState(processArtifact, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [activeTab, setActiveTab] = useState("text");

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state.error, state.timestamp, toast]);

  useEffect(() => {
    if (state.opinions) {
        formRef.current?.reset();
        // Also reset the active tab if you want to.
        // setActiveTab("text");
    }
  }, [state.opinions, state.timestamp]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-2 max-w-7xl mx-auto">
          <Card className="md:col-span-2">
             <CardHeader>
                <CardTitle className="font-headline text-3xl flex items-center gap-2">
                    <Wand2 className="h-8 w-8 text-primary"/>
                    <span>Submit your Artifact</span>
                </CardTitle>
                <CardDescription>
                    Provide text, an image, or a short video for the council to review. The agents will analyze it based on the Covenant principles.
                </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text"><FileText className="mr-2"/>Text</TabsTrigger>
                    <TabsTrigger value="file"><Upload className="mr-2"/>File</TabsTrigger>
                </TabsList>
                <form ref={formRef} action={formAction} className="space-y-4 pt-4">
                  <TabsContent value="text">
                      <Textarea
                        name="artifact"
                        placeholder="Paste your text, idea, or proposal here..."
                        className="min-h-[200px] text-base"
                      />
                  </TabsContent>
                  <TabsContent value="file">
                      <Input name="artifactFile" type="file" accept="image/*,video/mp4,video/quicktime" />
                      <p className="text-sm text-muted-foreground mt-2">Max file size: 10MB. Supported formats: images, MP4, MOV.</p>
                  </TabsContent>
                  <SubmitButton />
                </form>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="font-headline text-3xl flex items-center gap-2">
                    <Bot className="h-8 w-8 text-primary"/>
                    <span>Council Deliberation</span>
                </CardTitle>
                <CardDescription>
                    The AI agents' opinions and alignment scores will appear here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RenderResults />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );

  function RenderResults() {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <div className="space-y-6">
                <div className="flex justify-center">
                    <Skeleton className="h-[300px] w-[300px] rounded-full" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        )
    }

    if (state.opinions) {
        return <OpinionVisualization analysis={state.opinions} />;
    }

    return (
        <div className="text-center text-muted-foreground py-16">
            <p>The council awaits your submission.</p>
        </div>
    )
  }
}
