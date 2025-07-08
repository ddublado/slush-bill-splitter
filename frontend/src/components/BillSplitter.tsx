'use client';

import { useState, useEffect } from 'react';

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
  const [isComplete, setIsComplete] = useState<boolean>(false);

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
      maximumFractionDigits: 2,
    }).format(value).replace('$', '');
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
  const removeParticipant = () => {
    if (participants.length > 1) {
      setParticipants(participants.slice(0, -1));
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

  // Reset the form for a new split
  const startNewSplit = () => {
    setTotalAmount('');
    setParticipants([
      { id: '1', name: 'Person 1', amount: 0 },
      { id: '2', name: 'Person 2', amount: 0 },
    ]);
    setValidationMessage('');
    setValidationStatus(null);
    setIsComplete(false);
    setIsLoading(false);
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

    // Local validation as fallback
    const numTotal = parseFloat(totalAmount.toString());
    const diff = parseFloat((numTotal - currentSum).toFixed(2));
    
    if (diff !== 0) {
      setValidationMessage(`Split is not balanced. Difference: ${formatCurrency(Math.abs(diff))}`);
      setValidationStatus('error');
      return;
    }

    // If we get here, the split is balanced
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
        setValidationMessage('🎉 Success! Your bill has been split perfectly. Here\'s the breakdown:');
        setValidationStatus('success');
        
        // Show success message for a moment, then show completion
        setTimeout(() => {
          setValidationMessage(`✅ Split Complete!\n\nTotal: ${formatCurrency(numTotal)}\n${participants.map(p => `${p.name}: ${formatCurrency(p.amount)}`).join('\n')}\n\nYou can now share this breakdown with your group!`);
          setIsComplete(true);
        }, 1500);
      } else {
        setValidationMessage(`Split validation failed: ${data.message}`);
        setValidationStatus('error');
      }
    } catch (error) {
      console.log('API validation failed, using local validation instead:', error);
      // Still show success since local validation passed
      setValidationMessage('🎉 Success! Your bill has been split perfectly. Here\'s the breakdown:');
      setValidationStatus('success');
      
             setTimeout(() => {
         setValidationMessage(`✅ Split Complete!\n\nTotal: ${formatCurrency(numTotal)}\n${participants.map(p => `${p.name}: ${formatCurrency(p.amount)}`).join('\n')}\n\nYou can now share this breakdown with your group!`);
         setIsComplete(true);
       }, 1500);
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
    <div className="flex flex-col h-full">
      {/* Total Amount Input */}
      <div className="currency-input-container">
        <div className="flex items-center">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            className="currency-input text-gray-900"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={totalAmount}
            onChange={handleTotalAmountChange}
          />
        </div>
        <p className="text-center text-gray-500 mt-1 text-sm">Enter Total Amount</p>
      </div>

      {/* Participants Section */}
      <div className="participants-container">
        {/* Participants Controls */}
        <div className="participants-header">
          <div className="people-counter">
            <button
              onClick={removeParticipant}
              className="counter-button"
              disabled={participants.length <= 1}
            >
              <span className="text-xl">−</span>
            </button>
            <span className="text-gray-800">{participants.length} people</span>
            <button
              onClick={addParticipant}
              className="counter-button"
            >
              <span className="text-xl">+</span>
            </button>
          </div>
          <button
            onClick={splitEvenly}
            className="split-button"
          >
            Split Evenly
          </button>
        </div>

        {/* Participants List */}
        <div className="mt-4 space-y-3">
          {participants.map((participant) => (
            <div key={participant.id} className="participant-row">
              <div className="flex-1">
                <input
                  type="text"
                  className="participant-input text-gray-900"
                  value={participant.name}
                  onChange={(e) => handleNameChange(participant.id, e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="flex items-center">
                <span className="text-[#f26d21] mr-1">$</span>
                <input
                  type="number"
                  className="amount-input text-gray-900"
                  value={participant.amount || ''}
                  onChange={(e) => handleAmountChange(participant.id, e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Message */}
      {validationMessage && (
        <div className="status-container">
          <div className={`p-3 rounded-md ${
            validationStatus === 'success' ? 'status-success' :
            validationStatus === 'error' ? 'status-error' :
            validationStatus === 'warning' ? 'status-warning' :
            'status-neutral'
          }`}>
            <div className="flex">
              <div className="ml-2">
                <p className="text-sm font-medium whitespace-pre-line">
                  {validationMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary and Submit */}
      <div className="mt-auto">
        <div className="summary-container">
          <p className="text-sm text-gray-400">
            Total assigned: <span className="text-gray-700 font-medium">{formatCurrency(currentSum)}</span>
            {remainingAmount !== 0 && (
              <>
                <br />
                Remaining: <span className={remainingAmount > 0 ? "text-yellow-600" : "text-red-600"}>{formatCurrency(Math.abs(remainingAmount))}</span>
              </>
            )}
          </p>
        </div>
        <div className="action-container">
          {isComplete ? (
            <button
              className="primary-btn"
              onClick={startNewSplit}
            >
              Start New Split
            </button>
          ) : (
            <button
              className="primary-btn"
              onClick={validateSplit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Continue"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillSplitter; 