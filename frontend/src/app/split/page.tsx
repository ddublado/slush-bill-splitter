'use client';
import BillSplitter from '@/components/BillSplitter';

export default function SplitterPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold md:text-5xl">Bill Splitter</h1>
          <p className="mt-4 text-lg text-light">
            How to use our simple bill splitter to best manage your group costs
            and settle debts.
          </p>
        </div>
        <div className="rounded-2xl bg-gray-50 p-6 shadow-lg md:p-10">
          <BillSplitter />
        </div>
      </div>
    </div>
  );
} 