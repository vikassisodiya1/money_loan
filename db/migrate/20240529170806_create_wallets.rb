class CreateWallets < ActiveRecord::Migration[7.1]
  def change
    create_table :wallets do |t|
      t.decimal :balance, default: 0, null: false
      t.belongs_to :user

      t.timestamps
    end
  end
end
