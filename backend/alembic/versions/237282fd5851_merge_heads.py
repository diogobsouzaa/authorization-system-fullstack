"""merge heads

Revision ID: 237282fd5851
Revises: 6b84a63ca491, d89594a4e1a5
Create Date: 2025-10-22 16:47:09.025285

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '237282fd5851'
down_revision: Union[str, Sequence[str], None] = ('6b84a63ca491', 'd89594a4e1a5')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
