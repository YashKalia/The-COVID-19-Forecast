# The COVID-19 Forecast
[Demo](https://covid-model.netlify.app/)


Currently the COVID-19 virus is affecting billions of people around the world. From our own quarantine, we, five students studying at the TU Delft in the Netherlands, have worked with the Delft Bioinformatics Lab to develop an agent-based predictive model that can estimate the situation in the Netherlands, ultimately serving as a tool that can aid in advising policy decisions and educate the public on the parameters which affect the spread of the virus.

The application is based upon the basic SIR (susceptible, infected, recovered) model, which is a simple mathematical model of an epidemic of an infectious disease in a population. We developed an agent-based model that extends upon the bases of the SIR model to emulate the behaviour of the COVID-19 virus. 

## The Model
After running the application, you will notice an animation with a bunch of dots running around on the right side of the screen. This collection of dots represents a given population and each of these dots is called an “agent” and represents a person within a population. By introducing some infected agents to this population, we can model the spread of a virus over time and estimate how it will spread through the population in the future.


## Data and Parameter Values

Our model is based upon the behaviour of the coronavirus, a virus that at the time of the creation of this model is spreading across the world and dramatically changing the way we are living. As this project began in the Netherlands, the population and transmission data is based upon that which is recorded by the United Nations and the RIVM (Rijksinstituut voor Volksgezondheid en Milieu).


## Agent States

The agents (people) can move through the following five states:
1. Susceptible: an agent that has not been exposed to the virus
2. Non-infectious: an agent that has been infected, but is in the incubation period
3. Infectious: an infected agent that has passed the incubation period
4. Immune: an agent that was infected, but is now resistant
5. Dead: an agent that has been killed as a result of infection

This is an overview of how agents move between states within the model:

![alt tag](https://gitlab.ewi.tudelft.nl/cse2000-software-project/2019-2020-q4/cluster-6/covid-19-modeling/covid-19-modeling/uploads/a25ad45321221d7dcd05c10b630f00ed/states_diagram.png)

## The Application

In the application, you can view the agent-based model running on the right side of the screen. On the left side of the screen you can find a graph and list of statistics that are updated based on the model.

## Tuning Model Parameters
You can tune the epidemic parameters in the side-bar menu to change how the virus spreads throughout the agent population. There are numerous visuals on the page that provide visual feedback on the model. By hovering over the question mark icons next to each visual, you can learn more about what it is showing you.


## List of Model Parameters

By opening the menu, the following model parameters can be adjusted:

* **Social distancing** how much agents avoid each other.
* **Attraction** how much agents are drawn to the center. This mimics central locations like grocery stores, etc.
* **Probability a collision will result in infection (transmission probability)**
* **Probability a non-infectious agent becomes immune:** probability a non-infectious agent becomes directly immune post incubation.
* **Minimum/Maximum incubation time:** range in which a non-infectious agent can remain in the incubation period.
* **Minimum/Maximum time a patient is infectious:** range in which an infectious agent is infectious.
* **Minimum time from end of incubation to death:** range in the amount of time before an infectious agent destined to die actually dies.
* **Circle of infection:** the amount of space around an agent in which the virus can be transmitted.
* **Initial number of susceptibles**
* **Initial number of infectious**
* **Number of communities**
* **Probability of testing Positive:** what chance is an agent is tested to be positive.
* **Infection reduction factor:** simulates social distancing/quarantine after testing positive making agents less likely to infect someone else.
* **Probability of moving to ICU:** what fraction of infected will end up in need of ICUs.
* **ICU capacity:** the number of ICU beds available per community for infected agents.
* **Minimum incubation time:** the time it takes for an agent to start infecting others after infection.
* **Maximum incubation time:** the max. time it takes for an agent to start infecting others after infection.
* **Minimum time a patient is infectious:** the min. time for which infectious agents infect others.
* **Maximum time a patient is infectious:** the max. time for which infectious agents infect others.
* **Minimum time from end of incubation to death:** the min. time needed for an agent to die after they turn infectious.
* **Maximum time from end of incubation to death:** the max. time until an agent dies after they turn infectious.

## Limitiations

This application can be used to model the virus behaviour and estimate its spread. By no means is this an accurate model. It simply allows you to see the effect of multiple parameters on the spread of the virus.

## Run & Deployment information
Checkout [this guide](./app/README.md) for information on running the app and deploying it

