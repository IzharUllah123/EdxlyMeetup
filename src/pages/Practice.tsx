import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Trophy, Target } from "lucide-react";

const subjects = ["Math", "Language Arts", "Science", "Social Studies", "Spanish"];
const grades = ["Pre-K", "Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade"];

const skillsByGrade = {
  "Pre-K": {
    "Math": [
      { category: "Numbers to 3", skills: ["Identify numbers - up to 3", "Choose the number that you hear - up to 3"] },
      { category: "Counting to 3", skills: ["Learn to count - up to 3", "Count pictures - up to 3", "Count dots - up to 3", "Count shapes - up to 3", "Count cubes - up to 3", "Count on frames - up to 3"] },
      { category: "One more and one less", skills: ["One more with pictures - up to 5", "One less with pictures - up to 5", "One more with pictures - up to 10", "One less with pictures - up to 10"] },
      { category: "Numbers and counting to 20", skills: ["Identify numbers - up to 20", "Count pictures - up to 20", "Count dots - up to 20", "Count shapes - up to 20"] }
    ],
    "Language Arts": [
      { category: "Letter Recognition", skills: ["Identify uppercase letters", "Identify lowercase letters", "Match uppercase and lowercase letters"] },
      { category: "Phonics", skills: ["Beginning sounds", "Ending sounds", "Rhyming words"] }
    ],
    "Science": [
      { category: "Living Things", skills: ["Identify living and non-living things", "Animal habitats", "Plant parts"] }
    ]
  },
  "Kindergarten": {
    "Math": [
      { category: "Numbers to 10", skills: ["Count to 10", "Number recognition", "Number writing", "Comparing numbers"] },
      { category: "Addition", skills: ["Add with pictures", "Add within 5", "Add within 10"] },
      { category: "Subtraction", skills: ["Subtract with pictures", "Subtract within 5", "Subtract within 10"] }
    ],
    "Language Arts": [
      { category: "Reading", skills: ["Sight words", "Short vowels", "Consonant sounds", "Simple sentences"] },
      { category: "Writing", skills: ["Letter formation", "Name writing", "Simple words"] }
    ]
  }
  // Add more grades as needed
};

const Practice = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const currentSkills = selectedGrade && selectedSubject 
    ? skillsByGrade[selectedGrade as keyof typeof skillsByGrade]?.[selectedSubject] || []
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Practice & Assessment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge and track your progress with our comprehensive practice exercises
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Skills Display */}
        {currentSkills.length > 0 ? (
          <div className="grid gap-6">
            {currentSkills.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <Card key={skillIndex} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{skill}</h4>
                          <Badge variant="outline" className="text-xs">
                            Practice
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>5-10 min</span>
                          <Trophy className="h-3 w-3 ml-2" />
                          <span>0/10</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Select Subject and Grade</h3>
              <p className="text-muted-foreground mb-6">
                Choose a subject and grade level to see available practice exercises
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <Card className="text-center p-4">
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-semibold">Completed</h3>
              <p className="text-2xl font-bold text-primary">0</p>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="pt-6">
              <Target className="h-8 w-8 mx-auto text-secondary mb-2" />
              <h3 className="font-semibold">In Progress</h3>
              <p className="text-2xl font-bold text-secondary">0</p>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 mx-auto text-accent mb-2" />
              <h3 className="font-semibold">Time Spent</h3>
              <p className="text-2xl font-bold text-accent">0h</p>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="pt-6">
              <BookOpen className="h-8 w-8 mx-auto text-success mb-2" />
              <h3 className="font-semibold">Streak</h3>
              <p className="text-2xl font-bold text-success">0</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Practice;