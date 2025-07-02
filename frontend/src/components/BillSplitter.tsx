'use client';

import { useState, useEffect } from 'react';
import { FaUserPlus, FaTrash, FaEquals } from 'react-icons/fa';
import { MdOutlineSplitscreen } from 'react-icons/md';

interface Participant {
  id: string;
  name: string;
  amount: number;
}

const BillSplitter = () => {
  const [totalAmount, setTotalAmount] = useState<number | ''>('');
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'Person 1', amount: 0 },
    { id: '2', name: 'Person 2', amount: 0 },
  ]);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [validationStatus, setValidationStatus] = useState<'success' | 'error' | 'warning' | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // API URL from environment variable or fallback to localhost
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // Calculate the current sum of all participant amounts
  const currentSum = participants.reduce((sum, participant) => sum + (participant.amount || 0), 0);
  
  // Calculate the remaining amount to be assigned
  const remainingAmount = totalAmount !== '' ? parseFloat(totalAmount.toString()) - currentSum : 0;
  
  // Format currency for display
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Handle total amount change
  const handleTotalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setTotalAmount('');
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setTotalAmount(numValue);
    }
  };

  // Handle participant name change
  const handleNameChange = (id: string, name: string) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, name } : p
    ));
  };

  // Handle participant amount change
  const handleAmountChange = (id: string, value: string) => {
    if (value === '') {
      setParticipants(participants.map(p => 
        p.id === id ? { ...p, amount: 0 } : p
      ));
      return;
    }
    
    const amount = parseFloat(value);
    if (!isNaN(amount) && amount >= 0) {
      setParticipants(participants.map(p => 
        p.id === id ? { ...p, amount } : p
      ));
    }
  };

  // Add a new participant
  const addParticipant = () => {
    const newId = (parseInt(participants[participants.length - 1]?.id || '0') + 1).toString();
    setParticipants([
      ...participants, 
      { id: newId, name: `Person ${newId}`, amount: 0 }
    ]);
  };

  // Remove a participant
  const removeParticipant = (id: string) => {
    if (participants.length > 1) {
      setParticipants(participants.filter(p => p.id !== id));
    }
  };

  // Split the bill evenly
  const splitEvenly = () => {
    if (totalAmount === '') return;
    
    const numTotal = parseFloat(totalAmount.toString());
    const evenSplit = numTotal / participants.length;
    
    // Handle potential rounding issues
    const lastPersonAdjustment = numTotal - (Math.floor(evenSplit * 100) / 100) * (participants.length - 1);
    
    setParticipants(participants.map((p, index) => {
      if (index === participants.length - 1) {
        // Last person gets any remaining cents to ensure exact total
        return { ...p, amount: parseFloat(lastPersonAdjustment.toFixed(2)) };
      } else {
        // Everyone else gets the evenly split amount, rounded to 2 decimal places
        return { ...p, amount: parseFloat(evenSplit.toFixed(2)) };
      }
    }));
  };

  // Validate the split with the backend
  const validateSplit = async () => {
    if (totalAmount === '') {
      setValidationMessage('Please enter a total amount');
      setValidationStatus('warning');
      return;
    }

    if (participants.length === 0) {
      setValidationMessage('Please add at least one participant');
      setValidationStatus('warning');
      return;
    }

    setIsLoading(true);
    try {
      const splits: Record<string, number> = {};
      participants.forEach(p => {
        splits[p.name] = p.amount;
      });

      const response = await fetch(`${API_URL}/api/validate-split`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total: parseFloat(totalAmount.toString()),
          splits,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setValidationMessage('Split is valid! Everyone has been assigned the correct amount.');
        setValidationStatus('success');
      } else {
        setValidationMessage(`Split is invalid. ${data.message}`);
        setValidationStatus('error');
      }
    } catch {
      setValidationMessage('Error validating split. Please try again.');
      setValidationStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Update validation message when values change
  useEffect(() => {
    if (totalAmount === '') {
      setValidationMessage('');
      setValidationStatus(null);
      return;
    }

    const numTotal = parseFloat(totalAmount.toString());
    const diff = parseFloat((numTotal - currentSum).toFixed(2));
    
    if (diff === 0) {
      setValidationMessage('Split is balanced!');
      setValidationStatus('success');
    } else if (diff > 0) {
      setValidationMessage(`${formatCurrency(diff)} still needs to be assigned`);
      setValidationStatus('warning');
    } else {
      setValidationMessage(`Split exceeds total by ${formatCurrency(Math.abs(diff))}`);
      setValidationStatus('error');
    }
  }, [totalAmount, currentSum]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">
          Total Amount
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="totalAmount"
            className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#f26d21] focus:border-[#f26d21]"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={totalAmount}
            onChange={handleTotalAmountChange}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Participants</h3>
          <div className="flex space-x-2">
            <button
              onClick={splitEvenly}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f26d21]"
            >
              <MdOutlineSplitscreen className="mr-2 h-4 w-4" />
              Split Evenly
            </button>
            <button
              onClick={addParticipant}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f26d21]"
            >
              <FaUserPlus className="mr-2 h-4 w-4" />
              Add Person
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#f26d21] focus:border-[#f26d21] py-2 px-3"
                  value={participant.name}
                  onChange={(e) => handleNameChange(participant.id, e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="w-1/3 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#f26d21] focus:border-[#f26d21]"
                  value={participant.amount || ''}
                  onChange={(e) => handleAmountChange(participant.id, e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <button
                onClick={() => removeParticipant(participant.id)}
                className="p-2 text-gray-400 hover:text-red-500"
                disabled={participants.length <= 1}
              >
                <FaTrash className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-4 mb-6 rounded-md ${
        validationStatus === 'success' ? 'bg-green-50 text-green-800' :
        validationStatus === 'error' ? 'bg-red-50 text-red-800' :
        validationStatus === 'warning' ? 'bg-yellow-50 text-yellow-800' :
        'bg-gray-50 text-gray-800'
      }`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <FaEquals className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              {validationMessage || 'Enter a total amount to get started'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            Total assigned: {formatCurrency(currentSum)}
          </p>
          {totalAmount !== '' && (
            <p className="text-sm text-gray-500">
              Remaining: {formatCurrency(remainingAmount)}
            </p>
          )}
        </div>
        <button
          onClick={validateSplit}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#f26d21] hover:bg-[#e25d11] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f26d21]"
        >
          {isLoading ? 'Validating...' : 'Validate Split'}
        </button>
      </div>
    </div>
  );
};

export default BillSplitter; 