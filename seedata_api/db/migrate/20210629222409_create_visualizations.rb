class CreateVisualizations < ActiveRecord::Migration[6.1]
  def change
    create_table :visualizations do |t|
      t.string :name
      t.string :svg_specs

      t.timestamps
    end
  end
end
