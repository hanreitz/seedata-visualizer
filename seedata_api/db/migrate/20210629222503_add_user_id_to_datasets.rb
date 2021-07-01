class AddUserIdToDatasets < ActiveRecord::Migration[6.1]
  def change
    add_column :datasets, :user_id, :integer
  end
end
