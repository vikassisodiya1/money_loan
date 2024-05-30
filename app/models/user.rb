class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :wallet, dependent: :destroy

  has_many :loans, dependent: :destroy
  has_many :wallet_transactions


  scope :admins, -> { where(admin: true) }

  after_create :create_wallet

  def create_wallet
    balance = admin? ? 1_000_000 : 10_000
    build_wallet(balance: balance).save!

  end
end
