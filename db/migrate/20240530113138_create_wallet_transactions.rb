class CreateWalletTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :wallet_transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :amount
      t.string :transaction_type
      t.references :loan, null: false, foreign_key: true

      t.timestamps
    end
  end
end
