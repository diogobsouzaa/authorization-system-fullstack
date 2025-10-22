"""fix_role_column_safely

Revision ID: 6b84a63ca491
Revises: d89594a4e1a5
Create Date: 2025-10-21 14:53:31.795108

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6b84a63ca491'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # 1. Adiciona a coluna como nullable
    op.add_column('users', sa.Column('role', sa.String(), nullable=True))
    
    # 2. Atualiza registros existentes com valor padrão
    op.execute("UPDATE users SET role = 'user' WHERE role IS NULL")
    
    # 3. Torna a coluna NOT NULL com valor padrão
    op.alter_column('users', 'role', nullable=False, server_default='user')

def downgrade():
    op.drop_column('users', 'role')