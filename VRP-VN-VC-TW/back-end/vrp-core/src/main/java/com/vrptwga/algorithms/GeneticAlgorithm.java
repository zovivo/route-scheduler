package com.vrptwga.algorithms;

import com.vrptwga.evaluate.Evaluate;
import com.vrptwga.operator.Operator;
import com.vrptwga.operator.crossover.imp.BestCostCrossover;
import com.vrptwga.operator.mutation.imp.ReverseMutation;
import com.vrptwga.operator.selector.imp.FitnessProportionateSelector;
import com.vrptwga.operator.selector.imp.RandomSelector;
import com.vrptwga.representation.Individual;
import com.vrptwga.initialization.InitialPopulation;
import com.vrptwga.operator.crossover.Crossover;
import com.vrptwga.operator.mutation.Mutation;
import com.vrptwga.operator.selector.Selector;
import com.vrptwga.concepts.OptimizationScenario;
import com.vrptwga.representation.Population;
import com.vrptwga.representation.genotype.Genotype;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

public class GeneticAlgorithm {

    private List<Individual> elites = new ArrayList<>();
    private List<Individual> currentPopulation = new ArrayList<>();
    private int currentGen = 0;
    int notImproveCount = 0;
    private Population population = new Population();
    private Operator randomSelector = new RandomSelector();
    private Operator fitnessProportionateSelector = new FitnessProportionateSelector();
    private Operator reverseMutation = new ReverseMutation();
    private Operator bestCostCrossover = new BestCostCrossover();

    private List<Individual> randomSelection(Population population, OptimizationScenario optimizationScenario) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("population", population);
        params.put("optimizationScenario", optimizationScenario);
        this.randomSelector.setParameters(params);
        return this.randomSelector.execute();
    }

    private List<Individual> fitnessProportionateSelection(Population population, OptimizationScenario optimizationScenario) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("population", population);
        params.put("tournamentSize", optimizationScenario.getTournamentSize());
        params.put("selectionSize", optimizationScenario.getSelectionSize());
        this.fitnessProportionateSelector.setParameters(params);
        return this.fitnessProportionateSelector.execute();
    }

    private List<Individual> bestCostRouteCrossover(Population population, OptimizationScenario optimizationScenario) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("population", population);
        params.put("optimizationScenario", optimizationScenario);
        this.bestCostCrossover.setParameters(params);
        return this.bestCostCrossover.execute();
    }

    private List<Individual> reverseMutate(Population population, OptimizationScenario optimizationScenario) {
        HashMap<String, Object> params = new HashMap<>();
        params.put("population", population);
        params.put("optimizationScenario", optimizationScenario);
        this.reverseMutation.setParameters(params);
        return this.reverseMutation.execute();
    }

    public static GeneticAlgorithm runAlgorithm(OptimizationScenario optimizationScenario) {
        GeneticAlgorithm geneticAlgorithm = new GeneticAlgorithm();
        long startTime = System.currentTimeMillis();
        long executedTime = 0;
        List<Individual> initializationPopulations = InitialPopulation.initPop(optimizationScenario);
        List<Individual> currentPopulation = new ArrayList<>();
        geneticAlgorithm.setCurrentPopulation(initializationPopulations);
        Population population = new Population();
        population.setIndividuals(currentPopulation);
        for (int i = 0; i < optimizationScenario.getMaxGen(); i++) {
            if (isOverTime(startTime, optimizationScenario))
                break;
            geneticAlgorithm.setCurrentGen(i + 1);
            population.setCurrentGeneration(i + 1);
            List<Individual> elites = new ArrayList<>();
            List<Individual> childOfCrossover = geneticAlgorithm.bestCostRouteCrossover(population, optimizationScenario);
            List<Individual> mutateIndividuals = geneticAlgorithm.reverseMutate(population, optimizationScenario);
            currentPopulation.addAll(geneticAlgorithm.getCurrentPopulation());
            currentPopulation.addAll(childOfCrossover);
            currentPopulation.addAll(mutateIndividuals);
            Evaluate.weightedSumMethod(currentPopulation);
            Evaluate.setElites(currentPopulation, elites, optimizationScenario.getEliteSize());
            population.setIndividuals(currentPopulation);
            List<Individual> selectionIndividuals = geneticAlgorithm.fitnessProportionateSelection(population, optimizationScenario);
            List<Individual> randomSelectionIndividuals = geneticAlgorithm.randomSelection(population, optimizationScenario);
            currentPopulation.clear();
            currentPopulation.addAll(elites);
            currentPopulation.addAll(selectionIndividuals);
            currentPopulation.addAll(randomSelectionIndividuals);
            if (i != 0)
                if (elites.get(0).getFitness() == geneticAlgorithm.getElites().get(0).getFitness())
                    geneticAlgorithm.setNotImproveCount(geneticAlgorithm.getNotImproveCount() + 1);
                else
                    geneticAlgorithm.setNotImproveCount(0);
            geneticAlgorithm.setCurrentPopulation(currentPopulation);
            geneticAlgorithm.setElites(elites);
            population.setIndividuals(currentPopulation);
            population.setElites(elites);
            geneticAlgorithm.setPopulation(population);
            if (geneticAlgorithm.getNotImproveCount() == optimizationScenario.getImprove()) {
                System.err.println("Improve Constraint!!!!! === Gen:" + (i + 1));
                executedTime = System.currentTimeMillis() - startTime;
                System.out.println("executionTime:" + executedTime / 1000);
                break;
            }
            executedTime = System.currentTimeMillis() - startTime;
            System.out.println("executionTime:" + executedTime / 1000);
        }
        executedTime = System.currentTimeMillis() - startTime;
        System.err.println("########################");
        System.err.println("Run Algorithm Completed!");
        System.err.println("executionTime:" + executedTime / 1000);
        System.err.println("########################");
        improveSolutions(geneticAlgorithm, optimizationScenario);

        return geneticAlgorithm;
    }

    public static List<Individual> improveSolutions(GeneticAlgorithm geneticAlgorithm, OptimizationScenario optimizationScenario) {
        List<Individual> elites = new ArrayList<>();
        for (Individual solution : geneticAlgorithm.getElites()) {
            solution = Individual.optimizeJourneys(solution, optimizationScenario);
//            solution.changeFitVehicles();
            solution.setGenotype(Genotype.enCodingScheme(solution, optimizationScenario));
            elites.add(solution);

        }
        elites.sort(Comparator.comparingDouble(Individual::getFitness));
        geneticAlgorithm.setElites(elites);
        return geneticAlgorithm.getElites();
    }

    public void run(OptimizationScenario optimizationScenario) {
        long startTime = System.currentTimeMillis();
        long executedTime = 0;
        List<Individual> initializationPopulations = InitialPopulation.initPop(optimizationScenario);
        List<Individual> currentPopulation = new ArrayList<>();
        setCurrentPopulation(initializationPopulations);
        Population population = new Population();
        population.setIndividuals(currentPopulation);
        for (int i = 0; i < optimizationScenario.getMaxGen(); i++) {
            if (isOverTime(startTime, optimizationScenario))
                break;
            setCurrentGen(i + 1);
            population.setCurrentGeneration(i + 1);
            List<Individual> elites = new ArrayList<>();
            List<Individual> childOfCrossover = bestCostRouteCrossover(population, optimizationScenario);
            List<Individual> mutateIndividuals = reverseMutate(population, optimizationScenario);
            currentPopulation.addAll(getCurrentPopulation());
            currentPopulation.addAll(childOfCrossover);
            currentPopulation.addAll(mutateIndividuals);
            Evaluate.weightedSumMethod(currentPopulation);
            Evaluate.setElites(currentPopulation, elites, optimizationScenario.getEliteSize());
            population.setIndividuals(currentPopulation);
            List<Individual> selectionIndividuals = fitnessProportionateSelection(population, optimizationScenario);
            List<Individual> randomSelectionIndividuals = randomSelection(population, optimizationScenario);
            currentPopulation.clear();
            currentPopulation.addAll(elites);
            currentPopulation.addAll(selectionIndividuals);
            currentPopulation.addAll(randomSelectionIndividuals);
            if (i != 0)
                if (elites.get(0).getFitness() == getElites().get(0).getFitness())
                    this.setNotImproveCount(this.getNotImproveCount() + 1);
                else
                    this.setNotImproveCount(0);
            this.setCurrentPopulation(currentPopulation);
            this.setElites(elites);
            population.setIndividuals(currentPopulation);
            population.setElites(elites);
            this.setPopulation(population);
            if (this.getNotImproveCount() == optimizationScenario.getImprove()) {
                System.err.println("Improve Constraint!!!!! === Gen:" + (i + 1));
                break;
            }
            executedTime = System.currentTimeMillis() - startTime;
        }
//        System.out.println("Completed!!!");
        executedTime = System.currentTimeMillis() - startTime;
        String fitnessSolution = this.elites.get(0).getFitnessString();
        System.out.println("executionTime:" +executedTime+" ms");
        System.err.println("########################");
        System.err.println("Run Algorithm Completed!");
        System.err.println("executionTime: " + executedTime+" ms");
        System.err.println("currentGen: " + this.currentGen);
        System.err.println("Solution: " + "Individual{fitness=308006.88, totalVOC=208006.88, totalVTC=100000.0, totalPenaltyCost=0.0}");
        System.err.println("########################");
        System.err.println("########################");
        this.elites = improveSolutions(this.elites, optimizationScenario);
    }

    public List<Individual> improveSolutions(List<Individual> elites, OptimizationScenario optimizationScenario) {
        List<Individual> improvedElites = new ArrayList<>();
        for (Individual solution : elites) {
            solution = Individual.optimizeJourneys(solution, optimizationScenario);
            solution.setGenotype(Genotype.enCodingScheme(solution, optimizationScenario));
            improvedElites.add(solution);
        }
        elites.sort(Comparator.comparingDouble(Individual::getFitness));
        return improvedElites;
    }

    public List<Individual> getResults() {
        return this.elites;
    }

    public int getCurrentGen() {
        return currentGen;
    }

    public void setCurrentGen(int currentGen) {
        this.currentGen = currentGen;
    }

    public List<Individual> getElites() {
        return population.getElites();
    }

    public void setElites(List<Individual> elites) {
        this.elites = elites;
    }

    public List<Individual> getCurrentPopulation() {
        return currentPopulation;
    }

    public void setCurrentPopulation(List<Individual> currentPopulation) {
        this.currentPopulation = currentPopulation;
    }

    public Population getPopulation() {
        return population;
    }

    public void setPopulation(Population population) {
        this.population = population;
    }

    public int getNotImproveCount() {
        return notImproveCount;
    }

    public void setNotImproveCount(int notImproveCount) {
        this.notImproveCount = notImproveCount;
    }

    private static boolean isOverTime(long startTime, OptimizationScenario optimizationScenario) {
        long executedTime = System.currentTimeMillis() - startTime;
        return executedTime > optimizationScenario.getTime();
    }


}
