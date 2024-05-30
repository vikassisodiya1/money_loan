class CreateLoans < ActiveRecord::Migration[7.1]
  def change
    create_table :loans do |t|
      t.decimal :amount
      t.integer :state
      t.belongs_to :user

      t.timestamps
    end
  end
end
