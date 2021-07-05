class RemoveSvgSpecsFromVisualizations < ActiveRecord::Migration[6.1]
  def change
    remove_column :visualizations, :svg_specs
  end
end
