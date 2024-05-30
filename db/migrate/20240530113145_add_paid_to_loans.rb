class AddPaidToLoans < ActiveRecord::Migration[7.1]
  def change
    add_column :loans, :paid, :boolean
  end
end
