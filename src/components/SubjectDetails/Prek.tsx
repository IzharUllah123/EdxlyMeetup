import { useParams, Link } from "react-router-dom"; // <-- No more useState
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Video,
  Gamepad2,
} from "lucide-react";
import { curriculumDatabase } from "@/data/curriculum"; // <-- Import shared data

// --- THE COMPONENT (Now much simpler) ---
const Perk = () => {
  const { gradeId, subjectId } = useParams();

  // --- Find Data ---
  const gradeData = curriculumDatabase[gradeId as keyof typeof curriculumDatabase];
  const subjectData = gradeData
    ? gradeData[subjectId as keyof typeof gradeData]
    : null;

  // --- Handle Missing Data ---
  if (!subjectData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
        <p className="text-muted-foreground mb-6">
          We're working hard to add this curriculum. Check back soon!
        </p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Grades
          </Link>
        </Button>
      </div>
    );
  }

  // --- Render Page ---
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <Button variant="outline" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Grades
            </Link>
          </Button>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {subjectData.title}
          </h2>

          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Badge variant="secondary" className="text-md px-3 py-1">
              <BookOpen className="w-4 h-4 mr-2 text-primary" />
              {subjectData.stats.skills} skills
            </Badge>
            {/* ... (other badges) ... */}
          </div>

          <p className="text-lg text-muted-foreground max-w-3xl">
            {subjectData.description}
          </p>
        </div>

        {/* --- CONTENT GRID (No more AI panel) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Left: Topics List */}
          {subjectData.topics.map((topic) => (
            <Card key={topic.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">
                  {topic.id}. {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {topic.skills.map((skill, index) => (
                    <li key={skill.id}>
                      {/* --- THIS IS NOW A LINK --- */}
                      <Link
                        to={`/learn/${gradeId}/${subjectId}/${skill.id}`}
                        className={`flex items-start text-left w-full p-2 rounded-md transition-colors hover:bg-muted/50`}
                      >
                        <span className="text-muted-foreground mr-3 w-5 text-right">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-sm font-medium">
                          {skill.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* --- AI TUTOR PANEL IS REMOVED --- */}

        </div>
      </div>
    </section>
  );
};

export default Perk;