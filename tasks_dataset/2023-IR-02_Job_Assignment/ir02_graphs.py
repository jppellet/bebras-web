# author wilfried baumann, baumann@ocg.at, dachu 2023 irsee
import networkx as nx
from networkx.algorithms import bipartite   # use: pip install networkx

B = nx.Graph()
# Add nodes with the node attribute "bipartite"
B.add_nodes_from(["Englisch", "Spanisch", "Ungarisch", "Italienisch"], bipartite=0)
B.add_nodes_from(["A", "B", "C", "D", "E", "F", "G"], bipartite=1)
# Add edges only between nodes of opposite node sets
B.add_edges_from([("A", "Englisch"), ("B", "Englisch"), ("B", "Italienisch"), ("C", "Englisch"),
                  ("D", "Englisch"), ("D", "Spanisch"), ("D", "Ungarisch"), ("D", "Italienisch"),
                  ("E", "Spanisch"), ("E", "Italienisch"), ("F", "Englisch"), ("F", "Italienisch"),
                  ("G", "Italienisch")])
print(nx.bipartite.maximum_matching(B))

"""
returns:
{'Englisch': 'A', 'Italienisch': 'B', 'Ungarisch': 'D', 'Spanisch': 'E', 'A': 'Englisch', 'B': 'Italienisch', 'E': 'Spanisch', 'D': 'Ungarisch'}

"""