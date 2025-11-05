"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "../components/ui/Card";
import { Award, Target, Users, Zap } from "lucide-react";

interface Value {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export default function About() {
  const values: Value[] = [
    {
      icon: Award,
      title: "Quality Content",
      description: "Every material is expertly curated and verified for accuracy",
    },
    {
      icon: Target,
      title: "Student Success",
      description: "We're committed to helping every student achieve their goals",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join thousands of learners on their educational journey",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly improving our platform with the latest technology",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About EduPlatform</h1>
          <p className="text-xl md:text-2xl text-indigo-100 leading-relaxed">
            Empowering students with quality educational content since 2024. Our mission is to make premium learning accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Story</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded by educators who understand the challenges students face, EduPlatform was born from a simple idea: quality education should be accessible to all.
                </p>
                <p>
                  We've partnered with experienced teachers and subject matter experts to create comprehensive learning materials that truly make a difference in students' lives.
                </p>
                <p>
                  Today, we're proud to serve thousands of students, helping them achieve their academic goals through our curated collection of notes and video lectures.
                </p>
              </div>
            </div>
            <div className="relative w-full h-80 md:h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800"
                alt="Students studying"
                fill
                className="object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-gray-200/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-gray-600">Dedicated professionals working for your success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-gray-200/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-1">Team Member</h3>
                  <p className="text-sm text-gray-600 mb-3">Position</p>
                  <p className="text-sm text-gray-600">
                    Passionate about education and helping students succeed.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
