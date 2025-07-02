import BillSplitter from '@/components/BillSplitter';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Split Your Bill</h1>
      <BillSplitter />
    </div>
  );
}
