export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#007AFF] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[17px] text-[rgba(0,0,0,0.6)]">加载中...</p>
      </div>
    </div>
  );
}
