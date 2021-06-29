class CreateDatasets < ActiveRecord::Migration[6.1]
  def change
    create_table :datasets do |t|
      t.string :name
      t.string :contents

      t.timestamps
    end
  end
end
