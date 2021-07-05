class AddChoicesToVisualizations < ActiveRecord::Migration[6.1]
  def change
    add_column :visualizations, :x_choice, :integer
    add_column :visualizations, :y_choice, :integer
  end
end
