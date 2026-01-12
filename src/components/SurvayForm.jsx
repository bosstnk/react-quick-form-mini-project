import { Film } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { validateEmail, validateRequired } from "@/utils/validation";
import { movies } from "@/constants/movies";
import { CircleCheckBig } from "lucide-react";

function SurvayForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [movie, setMovie] = useState("");
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    movie: "",
  });

  function handleSent(e) {
    e.preventDefault();
    let hasError = false;

    const newErrorMessage = {
      name: validateRequired(name, "โปรดใส่ชื่อของคุณ"),
      email: validateEmail(email),
      movie: validateRequired(movie, "กรุณาเลือกหนังที่คุณชอบ"),
    };

    if (
      newErrorMessage.name ||
      newErrorMessage.email ||
      newErrorMessage.movie
    ) {
      hasError = true;
    }

    setErrorMessage(newErrorMessage);
    if (!hasError) {
      setSent(true);
    }
  }

  function handleReset() {
    setName("");
    setEmail("");
    setMovie("");
    setComment("");
  }

  function handleReForm() {
    setSent(false);
    handleReset();
  }

  console.log(name, email);
  return (
    <div className="flex flex-col w-full max-w-md shadow-lg">
      <div className="p-6 flex flex-row items-center justify-center gap-2 space-y-1.5 text-2xl font-semibold text-white bg-black">
        <Film size={24} />
        <h1>Movie Survay</h1>
      </div>

      {!sent ? (
        <form action="">
          <div className="p-6">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="name">ชื่อ</Label>
              <Input
                type="text"
                id="name"
                value={name}
                placeholder="กรุณากรอกชื่อของคุณ"
                onChange={(e) => setName(e.target.value)}
              />
              {errorMessage.name && (
                <p className="text-sm text-red-500">{errorMessage.name}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-3 mt-6">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                type="email"
                id="email"
                value={email}
                placeholder="example@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage.email && (
                <p className="text-sm text-red-500">{errorMessage.email}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-3 mt-6">
              <Label htmlFor="email">เลือกหนังที่ชอบ</Label>
              <RadioGroup
                defaultValue=""
                onChange={(e) => setMovie(e.target.value)}
              >
                {movies.map((movie) => {
                  return (
                    <div
                      className="flex items-center p-2 space-x-2"
                      key={movie.title}
                    >
                      <RadioGroupItem value={movie.title} id={movie.title} />
                      <div>
                        <Label htmlFor={movie.title}>
                          {movie.title} ({movie.year})
                        </Label>
                        <p className="">Director: {movie.director}</p>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
              {errorMessage.movie && (
                <p className="text-sm text-red-500">{errorMessage.movie}</p>
              )}

              <div className="grid w-full items-center gap-3 mt-6">
                <Label htmlFor="comment">ความคิดเห็น</Label>
                <Textarea
                  id="comment"
                  placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="p-6 pt-4 flex flex-row justify-between border border-t-black">
            <Button
              className="px-2 py-4"
              variant="outline"
              size="sm"
              onClick={handleReset}
            >
              <RefreshCcw /> รีเซต
            </Button>

            <Button
              className="px-2 py-4"
              variant="outline"
              size="sm"
              onClick={(e) => handleSent(e)}
            >
              <Send /> ส่งแบบสำรวจ
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col p-6">
          <div className="p-4 rounded-2xl bg-green-50 border border-green-200">
            <h3 className="flex flex-row gap-2 text-lg text-green-800">
              <CircleCheckBig />
              ส่งแบบสำรวจสำเร็จ!
            </h3>
            <p>ชื่อ {name}</p>
            <p>อีเมล {email}</p>
            <p>หนังที่เลือก {movie} </p>
            <div>
              <p>ความคิดเห็น:</p>
              <p>{comment}</p>
            </div>
          </div>
          <Button className="flex flex-row gap-2 mt-6" onClick={handleReForm}>
            <RefreshCcw />
            ทำแบบสำรวจใหม่
          </Button>
        </div>
      )}
    </div>
  );
}

export default SurvayForm;
