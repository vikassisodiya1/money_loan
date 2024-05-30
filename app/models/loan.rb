class Loan < ApplicationRecord
  belongs_to :user
  has_many :wallet_transactions


  enum state: { requested: 0, approved: 1, open: 2, closed: 3, rejected: 4 }

  validates :amount, presence: true, numericality: { greater_than_0: true }
end
