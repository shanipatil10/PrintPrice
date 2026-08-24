"use client";

import { useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";

export default function Home() {
  const [single, setSingle] = useState("");
  const [double, setDouble] = useState("");
  const [copies, setCopies] = useState("1");

  const [singleRate, setSingleRate] = useState("1");
  const [doubleRate, setDoubleRate] = useState("1.5");

  const singlePages = Number(single) || 0;
  const doubleSheets = Number(double) || 0;
  const copyCount = Number(copies) || 1;

  const singlePrice = Number(singleRate) || 0;
  const doublePrice = Number(doubleRate) || 0;

  const singleCost = singlePages * singlePrice;
  const doubleCost = doubleSheets * doublePrice;

  const total = (singleCost + doubleCost) * copyCount;

  function reset() {
    setSingle("");
    setDouble("");
    setCopies("1");
    setSingleRate("1");
    setDoubleRate("1.5");
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 text-zinc-900">
      <div className="mx-auto max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
            <Calculator size={24} />
          </div>

          <h1 className="text-3xl font-bold">PrintPrice</h1>

          <p className="mt-1 text-sm text-zinc-500">
            Know exactly what you should pay.
          </p>
        </div>

        {/* Calculator */}
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">

          <h2 className="mb-5 text-lg font-semibold">
            Print details
          </h2>

          <div className="space-y-4">

            <Input
              label="Single-sided pages"
              value={single}
              onChange={setSingle}
              placeholder="e.g. 20"
            />

            <Input
              label="Double-sided sheets"
              value={double}
              onChange={setDouble}
              placeholder="e.g. 40"
            />

            <Input
              label="Copies"
              value={copies}
              onChange={setCopies}
              placeholder="1"
            />

          </div>

          {/* Rates */}
          <h2 className="mb-4 mt-7 text-lg font-semibold">
            Printing rates
          </h2>

          <div className="grid grid-cols-2 gap-3">

            <Input
              label="Single side ₹"
              value={singleRate}
              onChange={setSingleRate}
              placeholder="1"
              step="0.5"
            />

            <Input
              label="Double side ₹"
              value={doubleRate}
              onChange={setDoubleRate}
              placeholder="1.5"
              step="0.5"
            />

          </div>

          {/* Clear */}
          <button
            onClick={reset}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50"
          >
            <RotateCcw size={16} />
            Clear
          </button>

        </section>

        {/* Result */}
        <section className="mt-4 rounded-3xl bg-zinc-900 p-6 text-white">

          <p className="text-sm text-zinc-400">
            You should pay
          </p>

          <div className="mt-1 text-5xl font-bold tracking-tight">
            ₹{total.toFixed(2).replace(".00", "")}
          </div>

          {/* Breakdown */}
          <div className="mt-6 space-y-3 border-t border-zinc-700 pt-4 text-sm">

            {singlePages > 0 && (
              <Row
                label={`${singlePages} single-sided × ₹${singlePrice}`}
                value={`₹${singleCost}`}
              />
            )}

            {doubleSheets > 0 && (
              <Row
                label={`${doubleSheets} double-sided × ₹${doublePrice}`}
                value={`₹${doubleCost}`}
              />
            )}

            {copyCount > 1 && (
              <Row
                label={`Copies`}
                value={`${copyCount} ×`}
              />
            )}

          </div>

        </section>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Nothing is saved. Every calculation starts fresh.
        </p>

      </div>
    </main>
  );
}


type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  step?: string;
};

function Input({
  label,
  value,
  onChange,
  placeholder,
  step = "1",
}: InputProps) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </span>

      <input
        type="number"
        min="0"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-zinc-900 focus:bg-white"
      />

    </label>
  );
}


function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-zinc-400">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}