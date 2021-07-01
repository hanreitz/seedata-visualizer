class AddDescriptionToDatasets < ActiveRecord::Migration[6.1]
  def change
    add_column :datasets, :description, :string
  end
end
