# Highlight.js — Code blocks demo

Cette page permet de tester la coloration syntaxique des différents langages supportés par le Markdown Reader.

---

## HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
</head>
<body>
  <main class="app">
    <h1>Hello World!</h1>
    <button type="button">Clique ici</button>
  </main>
</body>
</html>
```

---

## CSS

```css
:root {
  --content-width: 75ch;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #202020;
  color: #f5f5f5;
}

.markdown-body {
  width: min(100% - 2rem, var(--content-width));
  margin-inline: auto;
}

.markdown-body h1:hover {
  text-decoration: underline;
}
```

---

## JavaScript

```javascript
const dinosaurs = [
  {
    name: 'Tyrannosaurus rex',
    mass: 8500,
    carnivore: true,
  },
  {
    name: 'Triceratops horridus',
    mass: 7000,
    carnivore: false,
  },
];

function getCarnivores(animals) {
  return animals.filter(animal => animal.carnivore);
}

// Display result
console.log(getCarnivores(dinosaurs));
```

---

## TypeScript

```typescript
interface Dinosaur {
  name: string;
  mass: number;
  carnivore: boolean;
}

const tyrannosaurus: Dinosaur = {
  name: 'Tyrannosaurus rex',
  mass: 8500,
  carnivore: true,
};

function getName(dinosaur: Dinosaur): string {
  return dinosaur.name;
}

console.log(getName(tyrannosaurus));
```

---

## JSON

```json
{
  "name": "Tyrannosaurus rex",
  "period": "Late Cretaceous",
  "mass": 8500,
  "carnivore": true,
  "extinct": true,
  "synonyms": null,
  "locations": [
    "United States",
    "Canada"
  ]
}
```

---

## XML

```xml
<?xml version="1.0" encoding="UTF-8"?>

<dinosaur id="trex">
  <name>Tyrannosaurus rex</name>
  <period>Late Cretaceous</period>
  <mass unit="kg">8500</mass>
  <carnivore>true</carnivore>
</dinosaur>
```

---

## Markdown

```markdown
# Tyrannosaurus rex

*Tyrannosaurus rex* était un **grand théropode carnivore**.

## Caractéristiques

- Bipède
- Carnivore
- Environ 12 mètres

> Un des dinosaures les plus célèbres.

[En savoir plus](https://example.com)
```

---

## Bash

```bash
#!/bin/bash

PROJECT_NAME="markdown-reader"

echo "Building $PROJECT_NAME..."

if [ -d "./dist" ]; then
  rm -rf ./dist
fi

mkdir ./dist
cp -r ./src/* ./dist/

echo "Build complete!"
```

---

## Shell

```shell
cd ~/projects/markdown-reader
mkdir -p dist/assets
cp index.html dist/
cp -r assets/* dist/assets/

echo "Files copied successfully"
```

---

## PowerShell

```powershell
$ProjectName = "markdown-reader"
$OutputDirectory = ".\dist"

Write-Host "Building $ProjectName..."

if (Test-Path $OutputDirectory) {
    Remove-Item $OutputDirectory -Recurse
}

New-Item -ItemType Directory -Path $OutputDirectory

Write-Host "Build complete!"
```

---

## Python

```python
class Dinosaur:
    def __init__(self, name, mass, carnivore):
        self.name = name
        self.mass = mass
        self.carnivore = carnivore

    def describe(self):
        return f"{self.name}: {self.mass} kg"


tyrannosaurus = Dinosaur(
    "Tyrannosaurus rex",
    8500,
    True
)

print(tyrannosaurus.describe())
```

---

## Java

```java
public class Dinosaur {

    private final String name;
    private final int mass;

    public Dinosaur(String name, int mass) {
        this.name = name;
        this.mass = mass;
    }

    public String getName() {
        return name;
    }

    public static void main(String[] args) {
        Dinosaur trex = new Dinosaur("Tyrannosaurus rex", 8500);

        System.out.println(trex.getName());
    }
}
```

---

## C

```c
#include <stdio.h>
#include <stdbool.h>

typedef struct {
    const char *name;
    int mass;
    bool carnivore;
} Dinosaur;

int main(void) {
    Dinosaur trex = {
        "Tyrannosaurus rex",
        8500,
        true
    };

    printf("%s: %d kg\n", trex.name, trex.mass);

    return 0;
}
```

---

## C++

```cpp
#include <iostream>
#include <string>

class Dinosaur {
public:
    Dinosaur(std::string name, int mass)
        : name(name), mass(mass) {}

    void describe() const {
        std::cout << name << ": " << mass << " kg\n";
    }

private:
    std::string name;
    int mass;
};

int main() {
    Dinosaur trex("Tyrannosaurus rex", 8500);
    trex.describe();

    return 0;
}
```

---

## C#

```csharp
using System;

public class Dinosaur
{
    public string Name { get; }
    public int Mass { get; }

    public Dinosaur(string name, int mass)
    {
        Name = name;
        Mass = mass;
    }

    public void Describe()
    {
        Console.WriteLine($"{Name}: {Mass} kg");
    }
}

var trex = new Dinosaur("Tyrannosaurus rex", 8500);
trex.Describe();
```

---

## PHP

```php
<?php

class Dinosaur
{
    public function __construct(
        public string $name,
        public int $mass
    ) {}

    public function describe(): string
    {
        return "{$this->name}: {$this->mass} kg";
    }
}

$trex = new Dinosaur("Tyrannosaurus rex", 8500);

echo $trex->describe();
```

---

## Ruby

```ruby
class Dinosaur
  attr_reader :name, :mass

  def initialize(name, mass)
    @name = name
    @mass = mass
  end

  def describe
    "#{name}: #{mass} kg"
  end
end

trex = Dinosaur.new("Tyrannosaurus rex", 8500)

puts trex.describe
```

---

## Go

```go
package main

import "fmt"

type Dinosaur struct {
	Name string
	Mass int
}

func (d Dinosaur) Describe() string {
	return fmt.Sprintf("%s: %d kg", d.Name, d.Mass)
}

func main() {
	trex := Dinosaur{
		Name: "Tyrannosaurus rex",
		Mass: 8500,
	}

	fmt.Println(trex.Describe())
}
```

---

## Rust

```rust
struct Dinosaur {
    name: String,
    mass: u32,
}

impl Dinosaur {
    fn describe(&self) -> String {
        format!("{}: {} kg", self.name, self.mass)
    }
}

fn main() {
    let trex = Dinosaur {
        name: String::from("Tyrannosaurus rex"),
        mass: 8500,
    };

    println!("{}", trex.describe());
}
```

---

## Swift

```swift
struct Dinosaur {
    let name: String
    let mass: Int

    func describe() -> String {
        return "\(name): \(mass) kg"
    }
}

let trex = Dinosaur(
    name: "Tyrannosaurus rex",
    mass: 8500
)

print(trex.describe())
```

---

## Kotlin

```kotlin
data class Dinosaur(
    val name: String,
    val mass: Int
)

fun describe(dinosaur: Dinosaur): String {
    return "${dinosaur.name}: ${dinosaur.mass} kg"
}

fun main() {
    val trex = Dinosaur(
        name = "Tyrannosaurus rex",
        mass = 8500
    )

    println(describe(trex))
}
```

---

## SQL

```sql
CREATE TABLE dinosaurs (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mass INTEGER,
    carnivore BOOLEAN DEFAULT FALSE
);

INSERT INTO dinosaurs (name, mass, carnivore)
VALUES ('Tyrannosaurus rex', 8500, TRUE);

SELECT name, mass
FROM dinosaurs
WHERE carnivore = TRUE
ORDER BY mass DESC;
```

---

## YAML

```yaml
dinosaur:
  name: "Tyrannosaurus rex"
  period: Late Cretaceous
  mass: 8500
  carnivore: true

  locations:
    - United States
    - Canada

database:
  enabled: false
  port: 5432
```

---

## TOML

```toml
title = "Dinosaur Database"
version = "1.0.0"

[database]
enabled = true
port = 5432

[dinosaur]
name = "Tyrannosaurus rex"
mass = 8500
carnivore = true

[dinosaur.discovery]
year = 1902
country = "United States"
```

---

## Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "server.js"]
```

---

## GraphQL

```graphql
type Dinosaur {
  id: ID!
  name: String!
  mass: Int
  carnivore: Boolean!
}

type Query {
  dinosaur(id: ID!): Dinosaur
  dinosaurs(carnivore: Boolean): [Dinosaur!]!
}

query GetDinosaur {
  dinosaur(id: "trex") {
    name
    mass
    carnivore
  }
}
```

---

## Plain text

```plaintext
Tyrannosaurus rex
------------------

Period: Late Cretaceous
Mass: approximately 8500 kg
Diet: carnivore

This block should not receive syntax highlighting.
```

```text
Du texte brut
sur plusieurs lignes
```

```txt
Même chose
```

---

## Bloc sans langage

```
This block has no language declaration.

const thisShouldNotBeHighlighted = true;

<div>
  Neither should this.
</div>
```

---

# Fin du test

Si tous les blocs précédents sont correctement affichés, le reader prend en charge l'ensemble du jeu de langages prévu pour sa coloration syntaxique.