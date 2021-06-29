class AddUserIdToDatasets < ActiveRecord::Migration[6.1]
  def change
    change_table :datasets do |t|
      t.integer :user_id
    end
  end
end
