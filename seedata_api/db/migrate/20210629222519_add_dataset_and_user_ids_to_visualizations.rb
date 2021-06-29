class AddDatasetAndUserIdsToVisualizations < ActiveRecord::Migration[6.1]
  def change
    change_table :visualizations do |t|
      t.integer :user_id
      t.integer :dataset_id
    end
  end
end
