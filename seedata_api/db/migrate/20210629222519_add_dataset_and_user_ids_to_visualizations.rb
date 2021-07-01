class AddDatasetAndUserIdsToVisualizations < ActiveRecord::Migration[6.1]
  def change
    add_column :visualizations, :user_id, :integer
    add_column :visualizations, :dataset_id, :integer
  end
end
