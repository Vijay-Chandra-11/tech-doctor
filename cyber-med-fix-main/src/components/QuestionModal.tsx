// import { useState, useEffect } from 'react';
// import { useGameStore } from '@/lib/gameStore';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { useToast } from '@/hooks/use-toast';

// const difficultyMap: Record<string, string> = {
//   leftArm: 'easy',
//   rightArm: 'easy',
//   legs: 'medium',
//   torso: 'medium',
//   head: 'hard',
// };

// export function QuestionModal() {
//   // THE FIX IS HERE: We are pulling failPart from the store!
//   const { activePart, setActivePart, curePart, failPart, addPenalty } = useGameStore();
//   const { toast } = useToast();
  
//   const [questions, setQuestions] = useState<any[]>([]);
//   const [currentQIndex, setCurrentQIndex] = useState(0);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [userInput, setUserInput] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (activePart) {
//       const difficulty = difficultyMap[activePart];
//       setIsLoading(true);

//       fetch('/questions.json')
//         .then(res => res.json())
//         .then(data => {
//           const playedIds = JSON.parse(localStorage.getItem('playedQuestions') || '[]');
//           let filtered = data.filter((q: any) => q.difficulty === difficulty);

//           filtered.sort((a: any, b: any) => {
//             const aPlayed = playedIds.includes(a.id) ? 1 : 0;
//             const bPlayed = playedIds.includes(b.id) ? 1 : 0;
            
//             if (aPlayed !== bPlayed) return aPlayed - bPlayed; 
//             if (a.usageCount !== b.usageCount) return a.usageCount - b.usageCount; 
//             return 0.5 - Math.random(); 
//           });

//           const selectedQuestions = filtered.slice(0, 5);
          
//           const newPlayedIds = [...playedIds, ...selectedQuestions.map((q: any) => q.id)];
//           localStorage.setItem('playedQuestions', JSON.stringify(newPlayedIds));

//           setQuestions(selectedQuestions);
//           setCurrentQIndex(0);
//           setCorrectCount(0);
//           setIsLoading(false);
//         })
//         .catch(err => {
//           console.error(err);
//           toast({ title: "Error loading questions", variant: "destructive" });
//         });
//     }
//   }, [activePart, toast]);

//   const handleSubmit = () => {
//     if (!userInput.trim()) return;

//     const currentQ = questions[currentQIndex];
//     const isCorrect = userInput.trim().toUpperCase() === currentQ.correctAnswer.toUpperCase();

//     if (isCorrect) {
//       setCorrectCount(prev => prev + 1);
//       toast({ title: "Correct!", variant: "default" });
//     } else {
//       addPenalty(1); 
//       toast({ title: "Wrong! +2 Min Penalty", variant: "destructive" });
//     }

//     if (currentQIndex < 4) {
//       setCurrentQIndex(prev => prev + 1);
//       setUserInput('');
//     } else {
//       // Pass the final evaluated count (+1 if the last question was just answered correctly)
//       evaluateOrgan(isCorrect ? correctCount + 1 : correctCount);
//     }
//   };

//   const evaluateOrgan = (finalCorrectCount: number) => {
//     if (finalCorrectCount >= 3) {
//       curePart(activePart!);
//       toast({ title: "Organ Cured!", description: `You got ${finalCorrectCount}/5 correct.` });
//     } else {
//       // THIS WILL NOW WORK PERFECTLY!
//       failPart(activePart!); 
//       toast({ 
//         title: "Organ Failed!", 
//         description: `You only got ${finalCorrectCount}/5 correct. It is now blocked.`,
//         variant: "destructive" 
//       });
//     }
//     setActivePart(null); 
//   };

//   if (!activePart) return null;

//   return (
//     <Dialog open={!!activePart} onOpenChange={(open) => !open && setActivePart(null)}>
//       <DialogContent className="max-w-2xl bg-slate-900 text-white border-slate-700">
//         <DialogHeader>
//           <DialogTitle className="text-2xl text-cyan-400 capitalize">
//             Curing: {activePart.replace(/([A-Z])/g, ' $1').trim()}
//           </DialogTitle>
//           <DialogDescription className="text-slate-300">
//             Question {currentQIndex + 1} of 5
//           </DialogDescription>
//         </DialogHeader>

//         {isLoading ? (
//           <div className="text-center py-10">Loading diagnostics...</div>
//         ) : (
//           <div className="space-y-6">
//             <h3 className="text-lg font-medium text-white">
//               {questions[currentQIndex]?.question}
//             </h3>

//             <div className="bg-slate-950 p-4 rounded-md border border-slate-800 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
//               <span className="text-xs text-slate-500 mb-2 block">// Language: {questions[currentQIndex]?.language}</span>
//               {questions[currentQIndex]?.codeSnippet}
//             </div>

//             <div className="space-y-4">
//               <label className="text-sm text-slate-400">
//                 Enter the line number of the error, or type "NA" if there is no error:
//               </label>
//               <div className="flex gap-4">
//                 <Input 
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
//                   placeholder="e.g. 4 or NA"
//                   className="bg-slate-800 border-slate-700 text-white"
//                   autoFocus
//                 />
//                 <Button onClick={handleSubmit} className="bg-cyan-600 hover:bg-cyan-500">
//                   Submit
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }




import { useState, useEffect } from 'react';
import { useGameStore } from '@/lib/gameStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Maps specific body parts to specific difficulties
const difficultyMap: Record<string, string> = {
  leftArm: 'easy',
  rightArm: 'easy',
  legs: 'medium',
  torso: 'medium',
  head: 'hard',
};

// Use the same storage key as the rest of the game to keep memory perfectly synced
const PLAYED_KEY = "tech_doctor_played_questions";

export function QuestionModal() {
  const { activePart, setActivePart, curePart, failPart, addPenalty } = useGameStore();
  const { toast } = useToast();
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activePart) {
      const difficulty = difficultyMap[activePart];
      setIsLoading(true);

      fetch('/questions.json')
        .then(res => res.json())
        .then(data => {
          // 1. Get the memory of what has been played
          const playedIdsStr = localStorage.getItem(PLAYED_KEY);
          const playedIds: (string | number)[] = playedIdsStr ? JSON.parse(playedIdsStr) : [];

          // 2. Filter ALL questions down to just the target difficulty (e.g., just "hard")
          const filteredByDifficulty = data.filter((q: any) => q.difficulty === difficulty);

          // 3. Separate them into unplayed vs played
          let unplayed = filteredByDifficulty.filter((q: any) => !playedIds.includes(q.id));
          let played = filteredByDifficulty.filter((q: any) => playedIds.includes(q.id));

          // 4. SHUFFLE THE UNPLAYED! This ensures every player gets a unique set.
          unplayed = unplayed.sort(() => Math.random() - 0.5);
          
          // (Also shuffle played just in case they run out of unplayed questions)
          played = played.sort(() => Math.random() - 0.5);

          // 5. Combine and take the top 5
          const sortedQuestions = [...unplayed, ...played];
          const selectedQuestions = sortedQuestions.slice(0, 5);
          
          // 6. Save the new memory so these 5 don't get repeated for the next team
          const newPlayedIds = [...playedIds, ...selectedQuestions.map((q: any) => q.id)];
          // Remove duplicates just to keep the array clean
          const uniquePlayedIds = Array.from(new Set(newPlayedIds));
          localStorage.setItem(PLAYED_KEY, JSON.stringify(uniquePlayedIds));

          setQuestions(selectedQuestions);
          setCurrentQIndex(0);
          setCorrectCount(0);
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          toast({ title: "Error loading questions", variant: "destructive" });
        });
    }
  }, [activePart, toast]);

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const currentQ = questions[currentQIndex];
    const isCorrect = userInput.trim().toUpperCase() === currentQ.correctAnswer.toString().toUpperCase();

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      toast({ title: "Correct!", variant: "default" });
    } else {
      addPenalty(1); 
      toast({ title: "Wrong! +2 Min Penalty", variant: "destructive" });
    }

    if (currentQIndex < 4) {
      setCurrentQIndex(prev => prev + 1);
      setUserInput('');
    } else {
      // Pass the final evaluated count (+1 if the last question was just answered correctly)
      evaluateOrgan(isCorrect ? correctCount + 1 : correctCount);
    }
  };

  const evaluateOrgan = (finalCorrectCount: number) => {
    if (finalCorrectCount >= 3) {
      curePart(activePart!);
      toast({ title: "Organ Cured!", description: `You got ${finalCorrectCount}/5 correct.` });
    } else {
      failPart(activePart!); 
      toast({ 
        title: "Organ Failed!", 
        description: `You only got ${finalCorrectCount}/5 correct. It is now blocked.`,
        variant: "destructive" 
      });
    }
    setActivePart(null); 
  };

  if (!activePart) return null;

  return (
    <Dialog open={!!activePart} onOpenChange={(open) => !open && setActivePart(null)}>
      <DialogContent className="max-w-2xl bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl text-cyan-400 capitalize">
            Curing: {activePart.replace(/([A-Z])/g, ' $1').trim()}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Question {currentQIndex + 1} of 5
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="text-center py-10">Loading diagnostics...</div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white">
              {questions[currentQIndex]?.question}
            </h3>

            <div className="bg-slate-950 p-4 rounded-md border border-slate-800 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
              <span className="text-xs text-slate-500 mb-2 block">// Language: {questions[currentQIndex]?.language}</span>
              {questions[currentQIndex]?.codeSnippet}
            </div>

            <div className="space-y-4">
              <label className="text-sm text-slate-400">
                Enter the line number of the error, or type "NA" if there is no error:
              </label>
              <div className="flex gap-4">
                <Input 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="e.g. 4 or NA"
                  className="bg-slate-800 border-slate-700 text-white"
                  autoFocus
                />
                <Button onClick={handleSubmit} className="bg-cyan-600 hover:bg-cyan-500">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}