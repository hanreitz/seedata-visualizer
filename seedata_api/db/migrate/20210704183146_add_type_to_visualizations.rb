class AddTypeToVisualizations < ActiveRecord::Migration[6.1]
  def change
    add_column :visualizations, :type, :string
  end
end
