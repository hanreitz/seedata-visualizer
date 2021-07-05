class ChangeTypeToChartTypeInVisualizations < ActiveRecord::Migration[6.1]
  def change
    rename_column :visualizations, :type, :chart_type
  end
end
