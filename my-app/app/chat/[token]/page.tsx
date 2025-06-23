import ChatRoom from "../../../chat-room"

interface ChatPageProps {
  params: {
    token: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  // 실제로는 토큰 검증 로직이 들어갈 곳
  const { token } = params

  // 토큰이 유효하지 않으면 에러 페이지 표시
  if (!token || token.length < 10) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">잘못된 접근입니다</h1>
          <p className="text-slate-300">유효한 채팅 링크를 통해 접속해주세요.</p>
        </div>
      </div>
    )
  }

  return <ChatRoom />
}
