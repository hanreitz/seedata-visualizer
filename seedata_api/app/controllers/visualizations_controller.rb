class VisualizationsController < ApplicationController
  before_action :set_visualization, only: [:show, :update, :destroy]

  # GET /visualizations
  def index
    @visualizations = Visualization.all

    render json: @visualizations
  end

  # GET /visualizations/1
  def show
    render json: @visualization
  end

  # POST /visualizations
  def create
    @visualization = Visualization.new(visualization_params)

    if @visualization.save
      render json: @visualization, status: :created, location: @visualization
    else
      render json: @visualization.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /visualizations/1
  def update
    if @visualization.update(visualization_params)
      render json: @visualization
    else
      render json: @visualization.errors, status: :unprocessable_entity
    end
  end

  # DELETE /visualizations/1
  def destroy
    @visualization.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_visualization
      @visualization = Visualization.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def visualization_params
      params.require(:visualization).permit(:name, :svg_specs)
    end
end
