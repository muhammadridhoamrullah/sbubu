<>
          {/* Alert Container */}
          <div
            className={`w-96 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-2xl p-6 
          
            transform transition-all duration-500 ease-in-out relative
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-[600px] opacity-0"
          }
        `}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                💰
              </div>
              <div>
                <h3 className="font-bold text-xl">New Donation!</h3>
                <p className="text-sm opacity-90">
                  From {currentAlert.donorName}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <p className="text-3xl font-bold text-center">
                Rp {currentAlert.amount.toLocaleString("id-ID")}
              </p>
            </div>

            {/* Message */}
            {currentAlert.message && (
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm italic">"{currentAlert.message}"</p>
              </div>
            )}

            {/* Progress Bar */}
            <div className="bg-white/20 w-full h-2 rounded-full overflow-hidden backdrop-blur-sm relative">
              <div
                className="h-full bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full transition-all shadow-lg"
                style={{
                  animation: `progress ${alertDuration}ms linear forwards`,
                  boxShadow: "0 0 10px rgba(250, 204, 21, 0.5)",
                }}
              ></div>
            </div>

            {/* Animation sparkles */}
            <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
              ✨
            </div>
          </div>
        </>