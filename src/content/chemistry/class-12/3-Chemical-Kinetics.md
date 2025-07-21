---
title: "Chemical Kinetics"
description: "A concise summary of the chapter covering reaction rates, factors influencing them (concentration, temperature, catalyst), integrated rate equations for zero and first order reactions, half-life, Arrhenius equation, and collision theory."
---

## 3 Chemical Kinetics

Chemistry fundamentally deals with change, converting substances with defined properties into others via chemical reactions. To fully understand any chemical reaction, chemists aim to determine its:

- **Feasibility**: Predictable by thermodynamics (reaction is feasible if ΔG < 0 at constant temperature and pressure).
- **Extent**: Determined from chemical equilibrium.
- **Speed (Rate)**: The time a reaction takes to reach equilibrium.

**Chemical kinetics** is the branch of chemistry that studies reaction rates and their mechanisms. While thermodynamics indicates only the feasibility of a reaction, chemical kinetics describes its rate. For instance, thermodynamics suggests diamond should convert to graphite, but the kinetic rate is so slow that the change is imperceptible. Kinetic studies help determine reaction speed and the conditions that can alter it.

### Objectives

After studying this unit, you will be able to:

- Define average and instantaneous reaction rates.
- Express reaction rate in terms of concentration changes of reactants or products over time.
- Distinguish between elementary and complex reactions.
- Differentiate between molecularity and order of a reaction.
- Define rate constant.
- Discuss the dependence of reaction rates on concentration, temperature, and catalyst.
- Derive integrated rate equations for zero and first order reactions.
- Determine rate constants for zeroth and first order reactions.
- Describe collision theory.

## 3.1 Rate of a Chemical Reaction

The **rate of a reaction** is defined as the change in concentration of a reactant or product per unit time. It can be expressed as:

- The rate of decrease in concentration of any reactant.
- The rate of increase in concentration of any product.

For a hypothetical reaction **R → P**, assuming constant volume:

- If [R]$_1$ and [P]$_1$ are concentrations at time t$_1$, and [R]$_2$ and [P]$_2$ at time t$_2$:
     - Δt = t$_2$ – t$_1$
     - Δ[R] = [R]$_2$ – [R]$_1$
     - Δ[P] = [P]$_2$ – [P]$_1$
- **Rate of disappearance of R** = `−Δ[R]/Δt` (multiplied by -1 because Δ[R] is negative).
- **Rate of appearance of P** = `+Δ[P]/Δt`.

### Average and Instantaneous Rate of Reaction

Equations (3.1) and (3.2) represent the **average rate of a reaction (r_av)**, which depends on the change in concentration and the time taken for that change. Average rate is constant for the interval it's calculated for.

The **instantaneous rate (r_inst)** expresses the rate at a particular moment in time. It is obtained when the average rate is considered over an infinitesimally small time interval, `dt` (i.e., when Δt approaches zero). Mathematically:
`r_inst = −d[R]/dt = +d[P]/dt`

Graphically, the instantaneous rate is the slope of the tangent drawn at time `t` on the concentration vs. time curve (Fig. 3.1 and Fig. 3.2).

### Units of Rate of a Reaction

The units of reaction rate are **concentration time⁻¹**.

- If concentration is in `mol L⁻¹` and time in `seconds`, units are `mol L⁻¹s⁻¹`.
- For gaseous reactions, if concentration is expressed in partial pressures, units will be `atm s⁻¹`.

### Expressing Rate for Reactions with Stoichiometric Coefficients

When stoichiometric coefficients of reactants or products are not equal to one, the rate of disappearance of reactants or appearance of products is divided by their respective stoichiometric coefficients to make them equal.

For example, for the reaction `2HI(g) → H₂(g) + I₂(g)`:
Rate of reaction = `−(1/2)Δ[HI]/Δt = Δ[H₂]/Δt = Δ[I₂]/Δt`.

For a gaseous reaction at constant temperature, rate can also be expressed in terms of the rate of change in partial pressure.

## 3.2 Factors Influencing Rate of a Reaction

The rate of a chemical reaction depends on experimental conditions such as:

- **Concentration** of reactants (pressure in case of gases).
- **Temperature**.
- **Catalyst**.

### 3.2.1 Dependence of Rate on Concentration

The rate of a chemical reaction generally **increases when reactant concentrations increase**. Conversely, it decreases as concentrations decrease over time.

### 3.2.2 Rate Expression and Rate Constant

The representation of the rate of reaction in terms of the concentration of reactants is known as the **rate law**, **rate equation**, or **rate expression**.

For a general reaction: `aA + bB → cC + dD`
The rate expression is given by:
**Rate = k [A]ˣ [B]ʸ** (Equation 3.4a)
Where `k` is a proportionality constant called the **rate constant**. This form is also known as the differential rate equation.

- The exponents `x` and `y` **may or may not be equal** to the stoichiometric coefficients (`a` and `b`) of the reactants.
- The **rate law must be determined experimentally** and cannot be predicted merely by looking at the balanced chemical equation.

For example, for `2NO(g) + O₂(g) → 2NO₂(g)`:
Experimental data shows the rate is `Rate = k [NO]² [O₂]`. Here, exponents are same as stoichiometric coefficients.
However, for `CHCl₃ + Cl₂ → CCl₄ + HCl`, the rate is `k [CHCl₃] [Cl₂]¹⁄²`. Here, exponents are different from stoichiometric coefficients.

### 3.2.3 Order of a Reaction

In the rate equation `Rate = k [A]ˣ [B]ʸ`:

- **x** and **y** represent the **order with respect to reactants A and B**, respectively. They indicate how sensitive the rate is to concentration changes.
- The **overall order of a reaction** is the sum of these exponents, i.e., `x + y`.
- The order of a reaction can be 0, 1, 2, 3, or even a fraction.
- A **zero order reaction** means the rate of reaction is independent of the concentration of reactants.

#### Units of Rate Constant

The units of the rate constant `k` depend on the order of the reaction. For a general reaction of order `n`:
`k = Rate / ([A]ˣ [B]ʸ) = (concentration/time) / (concentration)ⁿ = (concentration)¹⁻ⁿ time⁻¹`.

| Reaction Order   | Units of rate constant |
| :--------------- | :--------------------- |
| Zero order (0)   | `mol L⁻¹s⁻¹`           |
| First order (1)  | `s⁻¹`                  |
| Second order (2) | `L mol⁻¹s⁻¹`           |

### 3.2.4 Molecularity of a Reaction

- **Elementary reactions** are reactions that take place in one step.
- **Complex reactions** involve a sequence of elementary reactions (a mechanism) to produce the products.

**Molecularity** is defined as the number of reacting species (atoms, ions, or molecules) that must collide simultaneously in an elementary reaction to bring about a chemical reaction.

- **Unimolecular reaction**: Involves one reacting species (e.g., `NH₄NO₂ → N₂ + 2H₂O`).
- **Bimolecular reaction**: Involves simultaneous collision between two species (e.g., `2HI → H₂ + I₂`).
- **Trimolecular (termolecular) reaction**: Involves simultaneous collision between three reacting species (e.g., `2NO + O₂ → 2NO₂`).
- Reactions with molecularity greater than three are very rare and slow, as the probability of more than three molecules colliding simultaneously is very small.
- Complex reactions must take place in more than one step if their overall stoichiometric equation involves more than three molecules.

#### Rate Determining Step

In complex reactions, the **overall rate of the reaction is controlled by the slowest step** in the reaction mechanism, which is called the **rate determining step**. The rate of formation of an intermediate in the slowest step determines the rate of the reaction.

#### Distinction between Order and Molecularity

| Feature           | Order of a Reaction                                    | Molecularity of a Reaction                                                         |
| :---------------- | :----------------------------------------------------- | :--------------------------------------------------------------------------------- |
| Nature            | An **experimental quantity**.                          | Applicable **only for elementary reactions**.                                      |
| Value             | Can be **zero** and even a **fraction**.               | **Cannot be zero or a non-integer**; values are 1, 2, or 3 (rarely >3).            |
| Applicability     | Applicable to elementary as well as complex reactions. | No meaning for complex reactions.                                                  |
| Complex Reactions | Given by the slowest step.                             | Molecularity of the slowest step is the same as the order of the overall reaction. |

## 3.3 Integrated Rate Equations

It is not always convenient to determine the instantaneous rate graphically. To avoid this, differential rate equations are integrated to relate directly measured experimental data (concentrations at different times) to the rate constant. These integrated rate equations differ for reactions of different orders.

### 3.3.1 Zero Order Reactions

A zero order reaction's rate is proportional to the **zero power of the concentration of reactants**, meaning the rate is independent of reactant concentration.
For the reaction `R → P`:

- Differential rate law: `Rate = -d[R]/dt = k[R]⁰ = k`.
- Integrated rate equation: `[R] = -kt + [R]₀` (Equation 3.6).
     - Where `[R]₀` is the initial concentration of R at t = 0.
- Rate constant `k`: `k = ([R]₀ - [R]) / t` (Equation 3.7).
- **Plot**: A plot of `[R]` vs. `t` yields a straight line with **slope = -k** and **intercept = [R]₀** (Fig. 3.3).
- **Examples**: Some enzyme-catalysed reactions and reactions on metal surfaces, like the decomposition of gaseous ammonia on a hot platinum surface at high pressure (`2NH₃(g) → N₂(g) + 3H₂(g)`).

### 3.3.2 First Order Reactions

In first order reactions, the rate of the reaction is proportional to the **first power of the concentration of the reactant**.
For the reaction `R → P`:

- Differential rate law: `Rate = -d[R]/dt = k[R]`.
- Integrated rate equation forms:
     - `ln [R] = -kt + ln [R]₀` (Equation 3.9).
     - `ln ([R]₀ / [R]) = kt` (Equation 3.10).
     - `[R] = [R]₀ e⁻ᵏᵗ` (Equation 3.14).
     - `k = (2.303 / t) log ([R]₀ / [R])` (Equation 3.15).
- **Plots**:
     - A plot of `ln [R]` vs. `t` gives a straight line with **slope = -k** and **intercept = ln [R]₀** (Fig. 3.4).
     - A plot of `log ([R]₀ / [R])` vs. `t` gives a straight line with **slope = k/2.303** (Fig. 3.5).
- **Examples**: Hydrogenation of ethene (`C₂H₄(g) + H₂(g) → C₂H₆(g)`), all natural and artificial radioactive decay, decomposition of N₂O₅ and N₂O.

#### First Order Gas Phase Reactions

For a first order gas phase reaction `A(g) → B(g) + C(g)`:
If `pᵢ` is the initial pressure of A and `pₜ` is the total pressure at time `t`, and `x` is the decrease in pressure of A:

- `pₜ = pA + pB + pC = (pᵢ - x) + x + x = pᵢ + x`.
- `x = pₜ - pᵢ`.
- Partial pressure of A at time `t`, `pA = pᵢ - x = pᵢ - (pₜ - pᵢ) = 2pᵢ - pₜ`.
- Rate constant: `k = (2.303 / t) log (pᵢ / (2pᵢ - pₜ))` (Equation 3.16).

#### Pseudo First Order Reactions

These are reactions that obey first order rate law even though they are higher order reactions. This occurs when one of the reactants is present in a **large excess**, so its concentration does not significantly change during the reaction, making the rate appear independent of it.

- **Example**: Hydrolysis of ethyl acetate (`CH₃COOC₂H₅ + H₂O → CH₃COOH + C₂H₅OH`). If water is in large excess, the rate depends only on `[CH₃COOC₂H₅]`.
- **Example**: Inversion of cane sugar (`C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆`). Rate = `k [C₁₂H₂₂O₁₁]`.

### 3.3.3 Half-Life of a Reaction (t₁/₂)

The **half-life (t₁/₂) of a reaction** is the time in which the concentration of a reactant is reduced to one half of its initial concentration.

- **For a zero order reaction**:
  `t₁/₂ = [R]₀ / 2k`
  Half-life is **directly proportional to the initial concentration** of reactants and inversely proportional to the rate constant.

- **For a first order reaction**:
  `t₁/₂ = 0.693 / k` (Equation 3.17).
  Half-life period is **constant**, i.e., it is **independent of the initial concentration** of the reacting species.

#### Summary of Integrated Rate Laws (Table 3.4)

| Order | Reaction Type | Differential Rate Law | Integrated Rate Law                            | Straight Line Plot | Half-Life (t₁/₂)          | Units of k   |
| :---- | :------------ | :-------------------- | :--------------------------------------------- | :----------------- | :------------------------ | :----------- |
| 0     | R → P         | `d[R]/dt = -k`        | `kt = [R]₀ - [R]`                              | `[R]` vs `t`       | `[R]₀ / 2k`               | `mol L⁻¹s⁻¹` |
| 1     | R → P         | `d[R]/dt = -k[R]`     | `ln[R] = ln[R]₀ - kt` or `kt = ln([R]₀ / [R])` | `ln[R]` vs `t`     | `ln 2 / k` (or `0.693/k`) | `s⁻¹`        |

## 3.4 Temperature Dependence of the Rate of a Reaction

Most chemical reactions are **accelerated by an increase in temperature**. A common observation is that for a chemical reaction, with a rise in temperature by 10°C, the rate constant is nearly doubled.

The temperature dependence of the rate of a chemical reaction is accurately explained by the **Arrhenius equation**:
**k = A e⁻ᴱᵃ/ᴿᵀ** (Equation 3.18)
Where:

- `k` = rate constant
- `A` = **Arrhenius factor** or **frequency factor** (also pre-exponential factor); a constant specific to a particular reaction.
- `Eₐ` = **Activation energy** (measured in J mol⁻¹); the energy required to form an unstable intermediate called the **activated complex**.
- `R` = Gas constant
- `T` = Absolute temperature (in Kelvin)

### Explanation through Activated Complex

According to Arrhenius, reactants (e.g., H₂ and I₂) collide to form an unstable **intermediate (activated complex)** (Fig. 3.6). This complex exists for a very short time and then decomposes to form products (e.g., HI). The energy needed to form this activated complex is the **activation energy (Eₐ)**. A plot of **potential energy vs. reaction coordinate** (Fig. 3.7) shows the energy profile, where Eₐ represents the energy barrier that reactants must overcome.

### Maxwell-Boltzmann Distribution and Temperature Effect

Not all molecules in reacting species have the same kinetic energy. The **Maxwell-Boltzmann distribution curve** (Fig. 3.8) plots the fraction of molecules with a given kinetic energy `(N_E/N_T)` against kinetic energy `(E)`.

- The peak corresponds to the most probable kinetic energy.
- When temperature increases, the curve shifts to higher energy values and broadens (Fig. 3.9), meaning a **greater proportion of molecules possess much higher energies**.
- Increasing temperature significantly **increases the fraction of molecules that collide with energies greater than Eₐ**. This leads to a doubling of the reaction rate for a 10°C rise in temperature.
- The factor `e⁻ᴱᵃ/ᴿᵀ` in the Arrhenius equation represents the fraction of molecules with kinetic energy greater than Eₐ.

#### Deriving Eₐ and A from Arrhenius Equation

Taking the natural logarithm of the Arrhenius equation:
`ln k = -Eₐ/RT + ln A` (Equation 3.19)

- A plot of **ln k vs. 1/T** yields a straight line with **slope = -Eₐ/R** and **intercept = ln A** (Fig. 3.10).

For two different temperatures T₁ and T₂ with rate constants k₁ and k₂:
`ln (k₂/k₁) = (Eₐ/R) (1/T₁ - 1/T₂)`
Or, `log (k₂/k₁) = (Eₐ / 2.303R) (T₂ - T₁) / (T₁T₂)` (Equation 3.22).

Increasing temperature or decreasing activation energy will result in an increase in the rate of the reaction and an exponential increase in the rate constant.

### 3.4.1 Effect of Catalyst

A **catalyst** is a substance that **increases the rate of a reaction without undergoing any permanent chemical change** itself. (Substances that reduce reaction rate are called inhibitors).

#### Mechanism of Catalyst Action

- Catalysts participate in the reaction by forming **temporary bonds with reactants**, creating an intermediate complex. This complex decomposes to yield products and regenerate the catalyst.
- The catalyst provides an **alternate pathway or reaction mechanism** that has a **lower activation energy (Eₐ)** between reactants and products, thus lowering the potential energy barrier (Fig. 3.11).
- A lower Eₐ leads to a faster reaction rate (from Arrhenius equation).
- A small amount of catalyst can catalyse a large amount of reactants.
- A catalyst **does not alter Gibbs energy (ΔG)** of a reaction.
- It **catalyses spontaneous reactions** but not non-spontaneous ones.
- A catalyst **does not change the equilibrium constant** of a reaction. Instead, it helps attain equilibrium faster by catalysing both forward and backward reactions to the same extent.

## 3.5 Collision Theory of Chemical Reactions

Developed by Max Trautz and William Lewis (1916-18), collision theory provides insight into the energetic and mechanistic aspects of reactions, based on the kinetic theory of gases.

### Key Postulates and Concepts

- **Reactant molecules are assumed to be hard spheres** and reactions occur when molecules collide with each other.
- **Collision frequency (Z)**: The number of collisions per second per unit volume of the reaction mixture.
- For a bimolecular elementary reaction `A + B → Products`:
     - Initial rate expression: `Rate = Z_AB e⁻ᴱᵃ/ᴿᵀ` (Equation 3.23).
     - `Z_AB` is the collision frequency of reactants A and B.
     - `e⁻ᴱᵃ/ᴿᵀ` represents the fraction of molecules with energies equal to or greater than Eₐ.
- This equation works well for atomic species or simple molecules, but deviations are observed for complex molecules. This is because **not all collisions lead to product formation**.

### Effective Collisions

**Effective collisions** are those in which molecules collide with:

- **Sufficient kinetic energy** (called **threshold energy**).
     - Threshold energy = Activation Energy + energy possessed by reacting species.
- **Proper orientation**, to facilitate breaking of old bonds and formation of new bonds to form products.
     - Proper orientation allows bond formation, while improper orientation causes molecules to bounce back without reacting (Fig. 3.12).

### Steric Factor (P)

To account for effective collisions, a factor `P`, called the **probability or steric factor**, is introduced. It considers that molecules must be properly oriented during a collision.

- The modified rate expression becomes: **`Rate = P Z_AB e⁻ᴱᵃ/ᴿᵀ`**.

Thus, in collision theory, **activation energy and proper orientation of molecules** together determine the criteria for an effective collision and, consequently, the rate of a chemical reaction.

**Drawbacks**: Collision theory considers atoms/molecules as hard spheres and ignores their structural aspect.
