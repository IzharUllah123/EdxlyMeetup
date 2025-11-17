import { useState } from "react";
import { Link } from "react-router-dom"; // <-- 1. ADDED IMPORT
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock, Star, Play } from "lucide-react";

const GradeSelector = () => {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);

  const subjects = [
    "Math", "Physics", "Chemistry", "Science", 
    "English", "Arabic", "Information Technology", "Artificial Intelligence"
  ];

  const grades = [
    {
      id: "prek",
      title: "Pre-K",
      description: "Foundation skills, counting objects, letter recognition, and basic concepts",
      color: "grade-prek",
      icon: "P",
      skills: {
        Math: 170,
        "Language Arts": 119,
        Science: 85,
        "Social Studies": 92
      },
      features: ["Interactive Games", "Story Time", "Music & Arts", "Basic Skills"]
    },
    {
      id: "k",
      title: "Kindergarten", 
      description: "Comparing numbers, letter sounds, plants and animals, communities",
      color: "grade-k",
      icon: "K",
      skills: {
        Math: 364,
        "Language Arts": 189,
        Science: 64,
        "Social Studies": 68
      },
      features: ["Number Recognition", "Phonics", "Science Exploration", "Creative Arts"]
    },
    {
      id: "1",
      title: "First Grade",
      description: "Addition and subtraction, reading comprehension, light and sound",
      color: "grade-1", 
      icon: "1",
      skills: {
        Math: 347,
        "Language Arts": 206,
        Science: 67,
        "Social Studies": 67
      },
      features: ["Reading Fluency", "Math Operations", "Science Experiments", "Writing Skills"]
    },
    {
      id: "2",
      title: "Second Grade",
      description: "Multi-digit numbers, story elements, matter and materials",
      color: "grade-2",
      icon: "2",
      skills: {
        Math: 425,
        "Language Arts": 234,
        Science: 78,
        "Social Studies": 82
      },
      features: ["Advanced Reading", "Problem Solving", "Hands-on Science", "Research Skills"]
    },
    {
      id: "3",
      title: "Third Grade",
      description: "Multiplication, character analysis, ecosystems and habitats",
      color: "grade-3",
      icon: "3",
      skills: {
        Math: 398,
        "Language Arts": 267,
        Science: 89,
        "Social Studies": 95
      },
      features: ["Critical Thinking", "Research Projects", "Scientific Method", "Essay Writing"]
    },
    {
      id: "4",
      title: "Fourth Grade",
      description: "Fractions and decimals, informational texts, energy and motion",
      color: "grade-4",
      icon: "4",
      skills: {
        Math: 456,
        "Language Arts": 298,
        Science: 112,
        "Social Studies": 118
      },
      features: ["Complex Math", "Literature Analysis", "Lab Experiments", "Presentation Skills"]
    }
  ];

  // Extend for grades 5-12
  const upperGrades = [
    { id: "5", title: "Fifth Grade", icon: "5" },
    { id: "6", title: "Sixth Grade", icon: "6" },
    { id: "7", title: "Seventh Grade", icon: "7" },
    { id: "8", title: "Eighth Grade", icon: "8" },
    { id: "9", title: "Ninth Grade", icon: "9" },
    { id: "10", title: "Tenth Grade", icon: "10" },
    { id: "11", title: "Eleventh Grade", icon: "11" },
    { id: "12", title: "Twelfth Grade", icon: "12" }
  ];

  const allGrades = [...grades, ...upperGrades.map(grade => ({
    ...grade,
    description: `m for ${grade.title} students`,
    color: "grade-1",
    skills: {
      Math: 500 + parseInt(grade.id) * 50,
      "Language Arts": 300 + parseInt(grade.id) * 30,
      Science: 150 + parseInt(grade.id) * 25,
      "Social Studies": 120 + parseInt(grade.id) * 20,
      Physics: parseInt(grade.id) >= 9 ? 200 + (parseInt(grade.id) - 9) * 50 : 0,
      Chemistry: parseInt(grade.id) >= 10 ? 180 + (parseInt(grade.id) - 10) * 40 : 0,
      "Information Technology": parseInt(grade.id) >= 6 ? 150 + (parseInt(grade.id) - 6) * 30 : 0,
      "Artificial Intelligence": parseInt(grade.id) >= 11 ? 100 + (parseInt(grade.id) - 11) * 50 : 0
    },
    features: ["Advanced Analytics", "Live Sessions", "Peer Collaboration", "Expert Tutoring"]
  }))];

  // <-- 2. ADDED HELPER FUNCTION -->
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w-]+/g, ''); // Remove all non-word chars
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-bounce-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Grade Level</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive curriculum designed for every learning stage, from Pre-K to Grade 12
          </p>
        </div>

        {/* Grade Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {allGrades.map((grade, index) => (
            <Card 
              key={grade.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 animate-bounce-in ${
                selectedGrade === grade.id 
                  ? 'border-primary shadow-lg' 
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedGrade(selectedGrade === grade.id ? null : grade.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${grade.color || 'bg-primary'}`}>
                    {grade.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    New
                  </Badge>
                </div>
                <CardTitle className="text-lg">{grade.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {grade.description}
                </p>
                
                {/* --- 3. UPDATED "SKILLS PREVIEW" SECTION --- */}
                <div className="space-y-2">
                  {Object.entries(grade.skills || {}).slice(0, 3).map(([subject, count]) => {
                    const subjectId = slugify(subject); // <-- new
                    return (
                      <div key={subject} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{subject}</span>
                        {/* This <span> is now a <Link> with the same style */}
                        <Link
                          to={`/grade/${grade.id}/subject/${subjectId}`}
                          className="font-medium text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {count} skills
                        </Link>
                      </div>
                    );
                  })}
                  {Object.keys(grade.skills || {}).length > 3 && (
                    <p className="text-xs text-muted-foreground">
                      +{Object.keys(grade.skills || {}).length - 3} more subjects
                    </p>
                  )}
                </div>
                {/* --- END OF UPDATE --- */}


                <Button 
                  variant={selectedGrade === grade.id ? "default" : "outline"} 
                  className="w-full text-sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explore Curriculum
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Grade Details */}
        {selectedGrade && (
          <div className="animate-bounce-in">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <BookOpen className="mr-3 h-6 w-6 text-primary" />
                  {allGrades.find(g => g.id === selectedGrade)?.title} Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* --- 4. UPDATED "SUBJECTS GRID" SECTION --- */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-secondary" />
                    Available Subjects
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {subjects.map((subject) => {
                      const skills = allGrades.find(g => g.id === selectedGrade)?.skills;
                      const skillCount = skills?.[subject] || 0;
                      const subjectId = slugify(subject); // <-- new
                      return (
                        // This <Link> is the only addition
                        <Link
                          key={subject}
                          to={`/grade/${selectedGrade}/subject/${subjectId}`}
                        >
                          <Button 
                            variant="outline" 
                            className="btn-grade h-auto p-4 flex flex-col items-center text-center"
                          >
                            <span className="font-medium text-sm">{subject}</span>
                            {skillCount > 0 && (
                              <span className="text-xs text-primary mt-1">{skillCount} skills</span>
                            )}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                {/* --- END OF UPDATE --- */}

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-accent" />
                    Learning Features
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(allGrades.find(g => g.id === selectedGrade)?.features || []).map((feature) => (
                      <Badge key={feature} variant="secondary" className="p-2 justify-center text-center">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button size="lg" className="btn-hero">
                    <Play className="mr-2 h-5 w-5" />
                    Start Learning {allGrades.find(g => g.id === selectedGrade)?.title}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default GradeSelector;