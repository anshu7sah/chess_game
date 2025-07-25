import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <div className="w-[1500px] h-full mx-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 h-full">
          <div className="h-full flex items-center">
            <img src="/chess_board.png" alt="chess board" className=" w-full" />
          </div>
          <div className="flex flex-col h-full">
            <div className="w-[75%] mx-auto flex items-center justify-center h-full">
              <div className="flex flex-col gap-7">
                <div>
                  <h1 className="text-white text-[70px] font-bold">
                    Play Chess Online on the #1 Site!
                  </h1>
                </div>
                <div>
                  <button
                    className="bg-[#35CBF6] text-black px-15 py-2 text-2xl hover:shadow-lg hover:shadow-[#35CBF6] transition-all rounded-2xl"
                    onClick={() => navigate("/game")}
                  >
                    Play Game
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
