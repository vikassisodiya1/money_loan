class Wallet < ApplicationRecord
  belongs_to :user

  def debit(amount)
    raise ArgumentError, "Amount must be positive" unless amount.positive?
    self.balance -= amount
    save!  # Use save! to raise an exception on failure
  end

  def credit(amount)
    raise ArgumentError, "Amount must be positive" unless amount.positive?
    self.balance += amount
    save!  # Use save! to raise an exception on failure
  end
end
