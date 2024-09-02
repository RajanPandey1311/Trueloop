'use client';

import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center min-h-[40vh] justify-center px-4 md:px-24 py-12 bg-teal-900 text-white">
        <section className="text-center mb-4 md:mb-2">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of True and Anonymous Feedback.
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            TrueLoop - Where your identity remains a secret.
          </p>
        </section>
        <div className="flex flex-col xl:flex-row items-start md:items-center justify-between w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-8 mb-8">
          <section className="flex-1 w-full justify-center flex">
            <Carousel
              plugins={[Autoplay({ delay: 2000 })]}
              className="w-full xl:max-w-xl"
            >
              <CarouselContent>
                {messages.map((message, index) => (
                  <CarouselItem key={index} className="p-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{message.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4 h-28">
                        <Mail className="flex-shrink-0" />
                        <div>
                          <p>{message.content}</p>
                          <p className="text-xs text-muted-foreground">
                            {message.received}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </section>
          <section className="flex-1 w-full">
            <h2 className="text-2xl md:text-4xl font-semibold mb-4">
              Feedback Overview
            </h2>
            <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </section>
        </div>
      </main>
      <footer className="text-center p-4 md:p-6 bg-teal-700 text-white">
        © 2024 TrueLoop. All rights reserved.
      </footer>
    </>
  );
}
